import { FindOptions, ObjectId } from "mongodb";
import createMongoConnect from "../../utlis/mongoConfig";
import { USERCOLLECTION } from "../constants/collectionName";
import { TobjGetImagesParams } from "./image.model";
/**
 * 
 * @param {TobjGetImagesParams} 
 * @returns 
 */
export async function getImages({
  objreqBody,
}: {
  objreqBody: TobjGetImagesParams;
}) {
  const { client, db } = await createMongoConnect();
  try {
    const collection = db.collection(USERCOLLECTION);
    const { strId, strImageName } = objreqBody;
    const objFilterQuery = { _id: new ObjectId(strId) };
    strImageName &&
      Object.assign(objFilterQuery, {
        'arrImg.strImageName': strImageName,
      });
    const objOptions: FindOptions = {
      projection: {
        arrImg: { $elemMatch: { strImageName } },
      },
    };
    console.log(objFilterQuery);

    const objUserImages = await collection.findOne(objFilterQuery, objOptions);
    console.log(objUserImages);
    return objUserImages;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
}
