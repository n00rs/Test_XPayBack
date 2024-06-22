import { Router } from "express";
import { saveImage } from "../libs/images";
import { getImages } from "../libs/images";

const router: Router = Router();
router.post("/save_image", async (req, res, next) => {
  try {
    console.log(req.body);
    const objReturnData = await saveImage({ objreqBody: req.body });
    console.log(objReturnData);
    res.json({ body: objReturnData });
  } catch (err) {
    console.log(err);
    // throw err;
    next(err);
  }
});
router.post("/get_image", async (req, res, next) => {
  try {
    const objReturnData = await getImages({ objreqBody: req.body });
    res.json({ body: objReturnData });
  } catch (err) {
    next(err);
  }
});
router.post("/get_image_thumbnail");

export default router;
