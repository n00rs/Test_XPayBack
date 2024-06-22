import { Filter, FindOptions } from "mongodb";
import createMongoConnect from "../../utlis/mongoConfig";
import { USERCOLLECTION } from "../constants/collectionName";
import { TobjSignupParams } from "./user.model";
import bcrypt from "bcrypt";
import { jwtSign } from "../../utlis/generateSeceretKeys";

/**
 * 
 * @param {TobjSignupParams}  
 * @returns 
 */
export async function userLogin({
  objreqBody,
}: TobjSignupParams): Promise<any> {
  const { client, db } = await createMongoConnect();
  try {
    const collection = db.collection(USERCOLLECTION);
    const { strUserEmail, strPassWord } = objreqBody;

    if (!strUserEmail || !strPassWord)
      throw { strErrMessage: "MISSING_REQUIRED_DATA", objData: objreqBody };
    collection.findOne({});
    // Filter to find the document
    const objFilter: Filter<Document> = { strUserEmail: strUserEmail };
    // Projection to select fields
    const objProjection: FindOptions<Document> = {
      projection: {
        strUserEmail: 1,
        strPassWord: 1,
        strAccPublicKey: 1,
        strAccPrivateKey: 1,
        strRefrPublicKey: 1,
        strRefrPrivateKey: 1,
      },
    };

    const objUserDetails = await collection.findOne(objFilter, objProjection);
    console.log(objUserDetails);
    if (!objUserDetails)
      throw { strErrMessage: "USER_DOESN'T_EXIST", objData: objreqBody };

    const blnPassMatch = await bcrypt.compare(
      strPassWord,
      objUserDetails["strPassWord"]
    );
    if (!blnPassMatch)
      throw { strErrMessage: "INCORRECT_PASSWORD", objData: objreqBody };
    // todo save the refresh keys in redis

    // payload for token
    const objPayload = {
      strId: objUserDetails["_id"],
      strUserEmail: objUserDetails["strUserEmail"],
      strLoginTime: new Date().toDateString(),
    };
    // access token
    const strAccToken = jwtSign({
      objPayload,
      strPrivateKey: objUserDetails["strAccPrivateKey"],
    });
    // refresh token
    const strRefrToken = jwtSign({
      objPayload,
      strType: "REFRESH",
      strPrivateKey: objUserDetails["strAccPrivateKey"],
    });
    //create jwt and send success message
    return {
      strMessage: "LOGIN_SUCCESS",
      ...objUserDetails,
      strAccToken,
      strRefrToken,
    };
  } catch (err) {
    throw err;
  } finally {
    client.close(true);
  }
}
