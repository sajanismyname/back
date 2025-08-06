import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  logoutUser,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUsercoverImage,
  userlogin,
  refreshAccessToken,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-Password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/update-acccout").post(verifyJWT, updateAccountDetails);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), updateUsercoverImage);

router
  .route("/channel-profile/:username")
  .get(verifyJWT, getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
