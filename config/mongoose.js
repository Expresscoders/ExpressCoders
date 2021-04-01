const mongoose =  require('mongoose');
module.exports = function() {
    require("./UserSchema");
    const uri = "mongodb+srv://nikhil:MongoDB@mongodbserver.ytt43.mongodb.net/survey?retryWrites=true&w=majority";
    return mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true},  (err)=>{
        if(err){
          console.log(err)
        }else{
          console.log("connected to mongodb")
        }
      })
};