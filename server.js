const express = require("express");
let APP = express();
var cors = require('cors')

// Allow using JSON request
let bodyParser = require("body-parser");

APP.use(bodyParser.json());
APP.use(cors())
APP.options('*', cors())

// Database connection
const mong = require("mongoose");
const config = require("./config/app.config");

mong.connect(config.MDB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mong.connection;

mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log("Connected to MongoDB!");
});

// Mapping API handling
const publicAPIs = require("./api/public.api");
const authAPIs = require("./api/auth.api");
const surveyAPIs = require("./api/survey.api");

APP.use("/public/", publicAPIs);
APP.use("/auth/", authAPIs);
APP.use("/survey/", surveyAPIs);

const _app_folder = './dist';
// ---- SERVE STATIC FILES ---- //
APP.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
APP.all('*', function (req, res) {
    res.status(200).sendFile(`./index.html`, {root: _app_folder});
});

// Starting
APP.listen(process.env.PORT || config.SERVER_PORT, () => {
    console.log(`Server listening at :${process.env.PORT || config.SERVER_PORT}`)
})