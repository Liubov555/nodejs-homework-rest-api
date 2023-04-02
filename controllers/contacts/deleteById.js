const { NotFound } = require("http-errors");
const { Contact } = require("../../schema/schema");
const ObjectId = require("mongodb").ObjectId;

const deleteById = async (req, res) => {
    const owner = req.user._id;
    const _id = ObjectId(req.params.contactId);

    const result = await Contact.findOneAndDelete({ owner, _id });

    if (!result) {
        throw new NotFound(`Contact with id=${_id} not found`);
    };

    res.json(result);
};

module.exports = deleteById;