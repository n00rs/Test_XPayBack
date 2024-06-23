import { ObjectId } from "mongodb";
import generateThumbnails from "../../utlis/genrateThumbnails";
import createMongoConnect from "../../utlis/mongoConfig";
import { USERCOLLECTION } from "../constants/collectionName";
import { TobjSaveImageParams } from "./image.model";
const arrObjDefaultThumb = [{ intHeight: 200, intWidth: 200 }];

export async function saveImage({
  objreqBody,
}: {
  objreqBody: TobjSaveImageParams;
}) {
  try {
    let { strId, strImageName, arrThumbSize, strBase64 } = objreqBody;
    if (!arrThumbSize.length) arrThumbSize = arrObjDefaultThumb;

    // todo do basic validations
    const arrThumbBuff = await generateThumbnails({
      strBase64: strBase64,
      arrThumbSize,
    });
    const objUpdateData = {
      strImageName,
      strImgBase64: strBase64,
      arrThumbDetails: arrThumbBuff,
    };
    //
    const updateQuery = { $push: { arrImg: objUpdateData } };
    const objUpdateFilter = { _id: new ObjectId(strId) };
    const objUpdatedData = await updatedata({
      objUpdateFilter,
      updateQuery,
    });
    if (!objUpdatedData) throw "FAILED_TO_ADD_DATA";

    return {
      strMessage: "IMAGE_ADDED_SUCCESS_FULLY",
      _id: objUpdatedData["_id"],
      strName: objUpdatedData["strName"],
      strUserEmail: objUpdatedData["strUserEmail"],
      arrImg: objUpdatedData["arrImg"],
    };
  } catch (error) {
    throw error;
  }

  async function updatedata({ objUpdateFilter, updateQuery }) {
    const { client, db } = await createMongoConnect();
    try {
      const collection = db.collection(USERCOLLECTION);
      const objData = await collection.findOneAndUpdate(
        objUpdateFilter,
        updateQuery,
        {
          upsert: true,
          returnDocument: "after",
        }
      );
      return objData;
    } catch (err) {
      throw err;
    } finally {
      client.close();
    }
  }
}
