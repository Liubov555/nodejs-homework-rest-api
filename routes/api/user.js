const express = require("express");
const router = express.Router();

const { auth, upload, ctrlWrapper } = require("../../middlewares");
const { user: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatrs", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;