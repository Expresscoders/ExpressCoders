var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var SurveySchema = new Schema({
  title: {type: String, required: true},
  start_date: { type: Date, default: Date.now, required: true },
  questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

SurveyAnswerSchema = new Schema({
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

module.exports = mongoose.model('Survey', SurveySchema);