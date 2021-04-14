let mongoose = require('mongoose');

let SurveyResponseModel = mongoose.Schema({
    SurveyId: String,
    FullName: String,
    Email: String,
    Answers: [
        {
            IsMultiChoice: Boolean,
            IsAgreeDisagree: Boolean,
            IsShortAnswer: Boolean,
            Choices: [
                {
                    mc1Value: String,
                    mc2Value: String,
                    mc3Value: String,
                    mc4Value: String,
                }
            ],
            NumericOrder: Number
        }
    ],
    CreatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SurveyResponse', SurveyResponseModel);
