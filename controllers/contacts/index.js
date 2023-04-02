const add = require("./add");
const getAll = require("./getAll");
const getById = require("./getById");
const updateById = require("./updateById");
const deleteById = require("./deleteById");
const updateStatus = require("./updateFavorite");

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
    updateStatus
};