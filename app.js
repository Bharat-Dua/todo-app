const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectMongodb = require("./init/mongoDb");
const todoRoute = require("./routes/todo");
// init app
const app = express();
// connect to MongoDB database
connectMongodb();
// view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// routes middleware
app.use("/", todoRoute);



module.exports = app;
