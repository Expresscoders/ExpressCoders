let mongoose = require("mongoose")

let Schema = mongoose.Schema

let userSchema = new Schema({
    
    email:String,
    password:String,
    
})

module.exports = user= mongoose.model('user', userSchema, 'users')