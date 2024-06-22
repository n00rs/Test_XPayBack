import { ObjectId } from "mongodb";
import { USERCOLLECTION } from "../libs/constants/collectionName";
import { jwtDecode, jwtVerify } from "./generateSeceretKeys";
import createMongoConnect from "./mongoConfig";

export const verifyAccessToken = async (req, res, next) => {
  try {

    const strAcctoken: string = req.get("x-access-token");

    const strToken =
      strAcctoken.startsWith("Bearer") && strAcctoken?.split(" ")?.[1]?.trim();
    console.log({ strToken });
    if (!strToken)
      throw { statusCode: 401, message: "NO_TOKEN_NO_AUTHORISATION" };

    const { strId, strUserEmail, strLoginTime, iat, exp } = jwtDecode(strToken);

    // todo load rsa key from redis
    const { client, db } = await createMongoConnect();
    const collection = db.collection(USERCOLLECTION);
    const { strAccPublicKey } = await collection.findOne(
      { _id: new ObjectId(strId) },
      { projection: { strAccPublicKey: 1 } }
    );
    await client.close(true);
    console.log(strAccPublicKey, "============");

    //verifing access_token
    const objDecode = jwtVerify({ strToken, strPublicKey: strAccPublicKey });
    if (!objDecode) throw new Error("REVOKED_TOKEN_PROVIDED");
    console.log(objDecode);
    req.body.strId = objDecode?.strId;
    next();
  } catch (err) {
    if(err?.name === "TokenExpiredError")
      err = 'REVOKED_TOKEN_PROVIDED'
    console.log(JSON.stringify(err));
    
    next(err);
  }
};
