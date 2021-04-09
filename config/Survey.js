const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const SURVEY_TYPE = {
    SHORT_ANSWER: "short_answer",
    MULTIPLE_CHOICE: "multiple_choice"
};

let SurveySchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                template: {
                    type: String,
                    enum: [
                        SURVEY_TYPE.SHORT_ANSWER,
                        SURVEY_TYPE.MULTIPLE_CHOICE
                    ],
                    required: true
                },
                response: {
                    type: Schema.Types.Mixed,
                    required: true,
                    validate: {
                        validator: function (v) {
                            switch (this.template) {
                                case SURVEY_TYPE.SHORT_ANSWER:
                                    return true;
                                    break;
                                case SURVEY_TYPE.MULTIPLE_CHOICE:
                                    return Array.isArray(v) && v.length >= 2 && v.every(option => typeof (option) == "string");
                                    break;
                                default: return false;
                            }
                        },
                        message: _ => `In case of a multi-choice survey template, a minimum of two response options are required`
                    }
                }
            }
        ],
        required: true,
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: _ => `Number of questions for a survey must not be lass than 1`
        }
    },
    publishDate: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    expiryDate: {
        type: Schema.Types.Date,
        default: function () {
            const date = new Date(this.publishDate.valueOf());
            date.setDate(date.getDate() + 90);
            return date;
        },
        validate: {
            validator: function (v) {
                return v > this.publishDate;
            },
            message: _ => `Survey's expiry date cannot be set before its publish date`
        }
    }
});

SurveyResponseSchema = new Schema({
    surveyId: { type: Schema.Types.ObjectId, required: true },
    answers: {
        type: [Schema.Types.Mixed],
        validate: {
            validator: function (vs) {
                const Survey = mongoose.model('Survey');
                return Survey.findOne({ _id: this.surveyId })
                    .then(survey => {
                        return vs.length == survey.questions.length && survey.questions
                            .map((k, i) => { return { question: k, answer: vs[i] } })
                            .every(qa => {
                                switch (qa.question.template) {
                                    case SURVEY_TYPE.SHORT_ANSWER:
                                        return typeof (qa.answer) == "string"
                                    default:
                                        return typeof (qa.answer) == "number" && qa.question.response[qa.answer]
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        return false;
                    })
            },
            message: _ => "Incompatible set of survey answers and questions. All survey questions must be answered, " +
                "and the type of a single answer must match that of its corresponding question. " +
                "Multi-choice answers must be numbers that represent indices in the array of possible response choices. " + 
                "Short answers must be pure text",
        },
        required: true
    },
    createdAt : {
        type : Schema.Types.Date,
        default : Date.now()
    }
});

mongoose.model("Survey", SurveySchema, "surveys");
mongoose.model("SurveyResponse", SurveyResponseSchema, "survey_responses");