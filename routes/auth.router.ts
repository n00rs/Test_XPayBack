import { Router } from "express";
import { createUser, userLogin } from "../libs/auth";

const router: Router = Router();
router.post("/user_login", async (req, res, next) => {
  try {
    console.log(req.body);
    const objReturnData = await userLogin({ objreqBody: req.body });
    console.log(objReturnData);
    res.json({ body: objReturnData });
  } catch (err) {
    next(err)
  }
});
router.post("/user_signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const objReturnData = await createUser({ objreqBody: req.body });
    console.log(objReturnData);
    res.json({ body: objReturnData });
  } catch (err) {
    console.log(err);
    // throw err;
    next(err);
  }
});

router.post("/refresh_token",(req,res,next)=>{
  // todo
})


export default router;
