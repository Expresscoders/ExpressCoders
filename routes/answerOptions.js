var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AnswerOption = require('../config/AnswerOption.js');

mongoose.set('useFindAndModify', false);

router.get('/', function(req, res){
	AnswerOption.find(function(err, options){
		if (err) return res.status(500).send('Error occurred: database error.');
		res.json(options.map(function(o){
			 return {
				 answerOption: o.answerOption,
				 text: o.text,
				 selectedByRespondents: o.selectedByRespondents,
				 startDate: o.start_date
			 }
		}));
	});
});

router.post('/', function(req, res){
	 var option = new AnswerOption({
		 text: req.body.text,
		 selectedByRespondents: req.body.selectedByRespondents
	 });
	 option.save(function(err, o){
		 if (err) return res.status(500).send('Error occurred: database error.');
		 res.send(200, 'AnswerOption successfully created.');
		 //res.json(question);
	 });
});

module.exports = router;