var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Survey = require('../config/Survey.js');
var Question = require('../config/Question.js');

mongoose.set('useFindAndModify', false);

router.get('/', function(req, res){
	Survey.find({})
		  .populate('questions')
	      .exec(function(err, surveys) {
	    	  res.json(surveys.map(function(s){
	 			 return {
	 				 surveyId: s.surveyId,
	 				 title: s.title,
	 				 questions: s.questions
	 			 }
	 		}));
	      });
});

router.post('/', function(req, res){
	 var survey = new Survey({
		 title: req.body.title,
		 startDate: req.body.startDate
	 });
	 survey.save(function(err, survey){
		 if (err) return res.status(500).send('Error occurred: database error.');
		 res.send(200, 'Survey successfully created.');
	 });
});

router.get('/:id', function(req, res, next) {
	Survey.findOne({surveyId: req.params.id})
	.populate('questions')
	.exec(function (err, s) {
		if (err) return res.status(500).send('Error occurred: database error.');
		res.json({
			surveyId: s.surveyId,
			title: s.title,
			questions: s.questions
		});
	});
});

router.put('/:id', function(req, res, next) {
  Survey.findOneAndUpdate({surveyId: req.params.id}, req.body, function (err, survey) {
	  if (err) return res.status(500).send('Error occurred: database error.');
    Survey.findOne({surveyId: req.params.id}, function (err, s) {
    	if (err) return res.status(500).send('Error occurred: database error.');
	    res.json({
			surveyId: s.surveyId,
			title: s.title,
			questions: s.questions
		});
	 });
  });
});


router.delete('/:id', function(req, res, next) {
  Survey.findOneAndRemove({surveyId: req.params.id}, req.body, function (err, post) {
	  if (err) return res.status(500).send('Error occurred: database error.');
    res.send(200, 'Survey deleted.');
  });
});

router.get('/:id/details', function(req,res){
	Survey.findOne({surveyId: req.params.id}, function(err, s){
		if (err) return res.status(500).send('Error occurred: database error.');
		res.json({
			title: s.title,
			startDate: s.start_date
		});
	});
});

router.get('/:id/questions', function(req,res){
	Survey.findOne({surveyId: req.params.id})
	.populate('questions')
	.exec(function(err, s){
		if (err) return res.status(500).send('Error occurred: database error.');
		
		res.json({
			questions: s.questions
		});
	});
});

router.get('/:id/questions/remove/:questionId', function(req,res){
	Survey.findOne({surveyId: req.params.id}, function(err, s){
		if (err) return res.status(500).send('Error occurred: database error.');
		Question.findOne({questionId: req.params.questionId})
		.exec(function(err, question){
			if (err) return res.status(500).send('Error occurred: database error.');
			s.questions.pull(question);
			s.save(function(err) {});
		});
		Question.deleteOne({ questionId: req.params.questionId }, function (err) {});
		res.status(200).send('Question removed.');
	});
});


module.exports = router;