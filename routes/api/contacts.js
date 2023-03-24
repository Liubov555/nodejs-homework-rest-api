const express = require("express");
const router = express.Router();

const {
  validation,
  ctrlWrapper,
  auth
} = require("../../middlewares");

const {
  contactsSchema,
  favoriteSchema,
  updateContactSchema } = require("../../schema/schema");
const { contacts: ctrl } = require("../../controllers");

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(contactsSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', auth, validation(updateContactSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:contactId/favorite", auth, validation(favoriteSchema), ctrlWrapper(ctrl.updateStatus));

module.exports = router;
