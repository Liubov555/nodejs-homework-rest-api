const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const { Contact, contactsSchema, favoriteSchema, updateContactSchema } = require("../../schema/schema");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw createError(404, `Contact with id = ${contactId} not found`);
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (!error) {
      throw createError(400, "Missing requered name field");
    };

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw createError(404, `Contact with id = ${contactId} not found`);
    };

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (!error) {
      throw createError(400, "Missing fields");
    };

    const { contactId } = req.params;
    const data = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });

    if (!result) {
      throw createError(400, "Not found");
    };

    res.json(result);

  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);

    if (error) {
      throw createError(400, "Missing field favorite");
    };

    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, {
      new: true,
    });

    if (!result) {
      throw createError(404, "Not found");
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
