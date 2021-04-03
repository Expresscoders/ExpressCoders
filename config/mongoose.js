const mongoose = require('mongoose');

module.exports = function () {
  const uri = "mongodb+srv://nikhil:MongoDB@mongodbserver.ytt43.mongodb.net/survey?retryWrites=true&w=majority";
  const db = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("connected to mongodb")
    }
  });
  require("./User");
  require("./Survey");
  return db;
};