const mongoose = require("mongoose");
const connectionUrl = "mongodb://0.0.0.0:27017/todoDb";
const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("Database connection successful");
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectMongodb;
