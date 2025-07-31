import { Router } from "express";
import { logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { userlogin } from "../controllers/user.controller.js";
import { verifyJWTq } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);
    next();
  },
  registerUser
);

router.route("/login").post(userlogin);

router.route("/logout").post(verifyJWTq, logoutUser);

export default router;
