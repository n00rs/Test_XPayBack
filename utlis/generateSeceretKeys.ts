import { generateKeyPair } from "crypto";
import jwt from "jsonwebtoken";
/**
 *   genrating keys
 * @returns {Promise<{strPublicKey, strPrivateKey}>}
 */
export const generatePublicPrivateKey = (): Promise<{
  strPublicKey: string;
  strPrivateKey: string;
}> => {
  return new Promise((res, reject) => {
    generateKeyPair(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        res({ strPublicKey: publicKey, strPrivateKey: privateKey });
      }
    );
  });
};
/**
 *
 * @param param0
 * @returns {string} json web token for auth
 */
export const jwtSign = ({
  objPayload,
  strType = "ACCESS",
  strPrivateKey = "",
}): string => {
  //getting exp time of access and refr token
  const strExpTim =
    strType === "ACCESS"
      ? process.env.ACCESS_EXP_TIME
      : process.env.REFRESH_EXP_TIME;
  //creating  token
  console.log(strPrivateKey);

  return jwt.sign(objPayload, strPrivateKey, {
    // expiresIn:  "12h",
    algorithm: "RS256",
    expiresIn: strExpTim,
  });
};
/**
 * @param param0
 * @returns
 */
export const jwtVerify = ({ strToken, strPublicKey }) =>
  jwt.verify(strToken, strPublicKey, { algorithm: ["RS256"] });

/**
 *
 * @param strToken
 * @returns {Object} payload from token
 */
export const jwtDecode = (strToken) => jwt.decode(strToken);
// JSON.parse(Buffer.from(strToken.split(".")[1], "base64").toString());
