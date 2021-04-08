var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../config/Question.js');
var Survey = require('../config/Survey.js');

mongoose.set('useFindAndModify', false);

router.get('/', function(req, res){
	Question.find(function(err, questions){
		if (err) return res.status(500).send('Error occurred: database error.');
		res.json(questions.map(function(q){
			 return {
				 questionId: q.questionId,
				 questionTitle: q.questionTitle,
				 answerOptions: q.answerOptions
			 }
		}));
	});
});

router.post('/', function(req, res){
	 var question = new Question({
		 questionTitle: req.body.questionTitle,
		 startDate: req.body.startDate,
		 answerOptions: req.body.answerOptions
	 });

	 question.save(function(err, q){
		 Survey.findOne({surveyId: req.body.surveyId}, function(err, survey) {
				survey.questions.push(question);
				survey.save(function(err) {});
			  });
		 res.status(200).send('Question successfully created.');
	 });
});

router.get('/:id', function(req, res, next) {
	Question.findOne({questionId: req.params.id}).exec(function (err, q) {
		if (err) return res.status(500).send('Error occurred: database error.');
	    res.json({
	    	questionId: q.questionId,
	    	questionTitle: q.questionTitle,
			answerOptions: q.answerOptions
		});
	  });
});

router.put('/:id', function(req, res, next) {
	Question.findOneAndUpdate({questionId: req.params.id}, req.body, function (err, question) {
		if (err) return res.status(500).send('Error occurred: database error.');
    Question.findOne({questionId: req.params.id}).exec(function (err, q) {
    	if (err) return res.status(500).send('Error occurred: database error.');
	    res.json({
	    	questionId: q.questionId,
	    	questionTitle: q.questionTitle,
			answerOptions: q.answerOptions
		});
	 });
  });
});


router.delete('/:id', function(req, res, next) {
	Question.findOneAndRemove({questionId: req.params.id}, req.body, function (err, question) {
		if (err) return res.status(500).send('Error occurred: database error.');
    res.send(200, 'Question deleted.');
  });
});

router.get('/:id/details', function(req,res){
	Question.findOne({questionId: req.params.id}, function(err, q){
		if (err) return res.status(500).send('Error occurred: database error.');
		res.json({
			questionTitle: q.questionTitle,
			startDate: q.start_date,
			answerOptions: q.answerOptions
		});
	});
});

module.exports = router;