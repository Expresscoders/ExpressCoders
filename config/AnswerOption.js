var mongoose = require('mongoose');
const Schema = mongoose.Schema;



var AnswerOptionSchema = new Schema({
	answerOption: Number,
	text: String,
	selectedByRespondents: Number,
	questionId: {type: Schema.Types.ObjectId, ref: 'Question'},
	start_date: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('AnswerOption', AnswerOptionSchema);