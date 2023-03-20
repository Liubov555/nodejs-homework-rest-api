const app = require("./app");
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 300 } = process.env;

mongoose.set("strictQuery", false);
mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

