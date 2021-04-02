let express = require('express');
let router = express.Router();
let surveyItem = require("../model/surveyModel")
let mongoose = require("mongoose")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* getting info from db */
router.get("/surveys", (req,res)=>{
  surveyItem.find((err,item)=>{
    if(err){
      console.log("err");
    }
    else{
      res.json(item)
    }
  })
})



