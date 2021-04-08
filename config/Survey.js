var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var SurveySchema = new Schema({
  title: {type: String, required: true},
  start_date: { type: Date, default: Date.now, required: true },
  questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

SurveySchema.plugin(AutoIncrement, {inc_field: 'surveyId'});

module.exports = mongoose.model('Survey', SurveySchema);