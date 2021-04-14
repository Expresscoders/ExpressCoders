let mongoose = require('mongoose');

let Survey = mongoose.Schema({
    SurveyTitle: String,
    SurveyExpiryDays: Number,
    Questions: [
        {
            Title: String,
            IsMultiChoice: Boolean,
            IsAgreeDisagree: Boolean,
            IsShortAnswer: Boolean,
            Choices: Array,
            NumericOrder: Number
        }
    ],
    UserId: String,
    CreatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Survey', Survey);
