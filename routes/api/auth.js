const express = require("express");
const router = express.Router();
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { joiLoginSchema, joiRegisterSchema } = require("../../schema/schema");
const { auth: ctrl } = require("../../controllers");

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;