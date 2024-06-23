import { generatePublicPrivateKey } from "../../utlis/generateSeceretKeys";
import createMongoConnect from "../../utlis/mongoConfig";
import { USERCOLLECTION } from "../constants/collectionName";
import { TobjReturnSignup, TobjSignupParams, TobjUser } from "./user.model";
import bcrypt from "bcrypt";

/**
 *
 * @param {Object}  objreqBody payload from FE
 * @returns {TobjReturnSignup} with success message and user details
 */
export async function createUser({
  objreqBody,
}: TobjSignupParams): Promise<TobjReturnSignup> {
  const { db, client } = await createMongoConnect();

  try {
    const collection = db.collection(USERCOLLECTION);
    // destructuring user data
    const { strPassWord, strName, strUserEmail } = objreqBody;
    // basic vaildation
    if (!strPassWord || !strName || !strUserEmail)
      throw { strErrMessage: "MISSING_REQUIRED_DATA", objData: objreqBody };
    //checking whether the email exist
    const arrExistUser = await collection.find({ strUserEmail }).toArray();
    //if mail id exists throw exception
    if (arrExistUser.length)
      throw { strErrMessage: "MAIL_ALREADY_EXIST_SYSTEM", objData: objreqBody };
    //hashing password
    const strHashedPass = await bcrypt.hash(strPassWord, 10);
    // creating public key and private key for jwt auth
    //setting data to save in data base
    const objSaveUser: TobjUser = {
      strPassWord: strHashedPass,
      strName,
      strUserEmail,
    };

    const objAccKey = await generatePublicPrivateKey();
    const objRefrKey = await generatePublicPrivateKey();

    objSaveUser["strAccPrivateKey"] = objAccKey["strPrivateKey"];
    objSaveUser["strAccPublicKey"] = objAccKey["strPublicKey"];
    objSaveUser["strRefrPrivateKey"] = objRefrKey["strPrivateKey"];
    objSaveUser["strRefrPublicKey"] = objRefrKey["strPublicKey"];


    //inserting data in database
    const objInsert = await collection.insertOne(objSaveUser);

    // if data insertion is failed throw exception
    if (!objInsert["acknowledged"])
      throw { strErrMessage: "ERROR_WHILE_SAVING_USER", objData: objreqBody };
    // removing hashed password from obj
    delete objSaveUser["strPassWord"];
    return { strMessage: "USER_CREATED_SUCCESSFULLY", ...objSaveUser };
  } catch (error) {
    throw new Error(error);
  } finally {
    client.close(true);
  }
}
