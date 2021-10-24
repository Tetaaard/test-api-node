const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connectDatabase = () => {
  mongoose.connect(`mongodb://${process.env.HOSTNAME}:${process.env.MONGODBPORT}/test_api`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};
