const { NotFound } = require("http-errors");
const { Contact } = require("../../schema/schema");
const ObjectId = require("mongodb").ObjectId;

const updateStatus = async (req, res) => {
    const owner = req.user._id;
    const _id = ObjectId(req.params.contactId);
    const { favorite } = req.body;

    const result = await Contact.findOneAndUpdate({ owner, _id }, { $set: { favorite } },
        {
            new: true
        });

    if (!result) {
        throw new NotFound("Missing field favorite");
    };

    res.json(result);
};

module.exports = updateStatus;