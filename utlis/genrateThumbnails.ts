import sharp from "sharp";
import { TobjimageSize } from "../libs/images/image.model";

/**
 *
 * @param {{  strBase64: string;  arrThumbSize: TobjimageSize[]}}
 * @returns {Promise<string[]>}
 */
export default async function generateThumbnails({
  strBase64,
  arrThumbSize = [],
}: {
  strBase64: string;
  arrThumbSize: TobjimageSize[];
}): Promise<string[]> {
  try {
    const imgBuffer = Buffer.from(
      strBase64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const arrThumBuffer: string[] = [];
    for (const { strHeight, strWidth } of arrThumbSize) {
      const bufResizedBuffer = await sharp(imgBuffer)
        .resize(strWidth, strHeight)
        .toBuffer();
      arrThumBuffer.push(bufResizedBuffer.toString("base64"));
      //   writeFileSync('img.jpg',bufResizedBuffer)
    }

    return arrThumBuffer;
  } catch (err) {
    throw new Error(err);
  }
}
