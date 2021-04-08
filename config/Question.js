var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var QuestionSchema = new Schema({
	questionTitle: {type: String, required: true},
	start_date: { type: Date, default: Date.now, required: true },
	answerOptions: [{
		answerOption: Number,
		text: String,
		selectedByRespondents: Number}
	],
	survey : { type: Schema.Types.ObjectId, ref: 'Survey' },
});

QuestionSchema.plugin(AutoIncrement, {inc_field: 'questionId'});

module.exports = mongoose.model('Question', QuestionSchema);