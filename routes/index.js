let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
let Survey = mongoose.model("Survey");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* getting info from db */
router.get("/surveys", (req,res)=>{
  Survey.find((err,item)=>{
    if(err){
      console.log("err");
    }
    else{
      res.json(item)
    }
  })
})

//add
router.post("/add", (req,res)=>{
  let newSurvey = new Survey({
    surveyName: req.body.surveyName,
    option1: req.body.option1,
    option2: req.body.option2
  })
  newSurvey.save((err,item)=>{
    if(err){
      res.json(err)
    }else{
      res.json({message:"Survey Added"})
    }
  })
})

//update
router.post("/update/:id", (req, res)=>{
  let id = mongoose.Types.ObjectId(req.params.id)
  Survey.findOneAndUpdate({_id: id},{
    $set:{
      surveyName : req.body.surveyName,
      option1 : req.body.option1,
      option2: req.body.option2
    }
  },(err,result)=>{
    if(err){
      res.json(err)
    }else{
      res.json(result)
    }
  })
})

//get Survey By ID
router.get("/edit/:id",(req,res)=>{
  let id = mongoose.Types.ObjectId(req.params.id)
  Survey.findById(id, (err,item)=>{
    res.json(item)
  })
})

//delete
router.delete("/delete/:id", (req,res)=>{
  let id = mongoose.Types.ObjectId(req.params.id)
  Survey.remove({_id: (id)}, (err,result)=>{
    if(err){
      res.json(err)
    }else{
      res.json(result)
    }
  })
})


module.exports = router;