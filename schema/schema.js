const Joi = require("joi");
const { Schema, model } = require('mongoose');

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.boolean().default(false),
});

const contactSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const addContactSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\+?[\d\s()-]+$/)
        .required(),
});

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

module.exports = {
    contactsSchema,
    favoriteSchema,
    Contact,
    addContactSchema,
    updateContactSchema
};