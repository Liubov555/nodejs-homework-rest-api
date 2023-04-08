const express = require("express");
const router = express.Router();

const { verifyEmailSchema } = require("../../schema/schema");
const { auth, upload, ctrlWrapper, validation } = require("../../middlewares");
const { user: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatrs", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;