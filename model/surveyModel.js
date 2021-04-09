let mongoose = require("mongoose")

let Schema = mongoose.Schema

let SurveySchema = new Schema({
    surveyName: {
        type:String, 
        required:true
    },
    option1: {
        type:String, 
        required: true
    },
    option2: {
        type:String, 
        required: true
    },
    email:{
        type: String
    },
    count:{
        type:Number,
        default:0
    }


})

module.exports = mongoose.model("surveyModel", SurveySchema,"surveys")