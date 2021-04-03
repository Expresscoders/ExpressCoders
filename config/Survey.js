let mongoose = require("mongoose")
let Schema = mongoose.Schema;

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
    }
});

mongoose.model("Survey", SurveySchema,"surveys");