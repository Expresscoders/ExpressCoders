let express = require('express');
let router = express.Router();
let surveyItem = require("../model/surveyModel")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//getting info from db
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

//add
router.post("/add", (req,res)=>{
  let newsurveyItem = new surveyItem({
    surveyName: req.body.surveyName,
    option1: req.body.option1,
    option2: req.body.option2
  })
  newsurveyItem.save((err,item)=>{
    if(err){
      res.json(err)
    }else{
      res.json({message:"Survey Added"})
    }
  })
})

//update
router.put("/update/:id", (req, res)=>{
  surveyItem.findOneAndUpdate({_id: req.params.id},{
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

//delete
router.delete("/delete/:id", (req,res)=>{
  surveyItem.remove({_id: req.params.id}, (err,result)=>{
    if(err){
      res.json(err)
    }else{
      res.json(result)
    }
  })
})
module.exports = router;
