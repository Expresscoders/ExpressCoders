let express = require('express');
let router = express.Router();
let jwt = require("jsonwebtoken")
let surveyItem = require("../model/surveyModel")
let userModel = require("../model/userModel")
let decode = require("jwt-decode")


let mongoose = require("mongoose");
const { request } = require('express');
const { find } = require('../model/analysisModel');
const { default: jwtDecode } = require('jwt-decode');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Coders' });
});

//verify Token
function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send("Unauthorized request")
  }else{
    // let token = req.headers.authorization
    let token = req.headers.authorization
    if(token === 'null'){
      return res.status(401).send("Unauthorized request")
    }else{
      let payload = jwt.verify(token, 'secretKey')
      if(!payload){
        return res.status(401).send("Unauthorized request")
      }else{
        req.userId = payload.subject
        next()
      }
    }
  }
}


//decoding function
const decodingJWT = (token) => {
  
  if(token !== null || token !== undefined){
   const base64String = token.split(".")[1];
   const decodedValue = JSON.parse(Buffer.from(base64String,
                        'base64').toString('ascii'));
   console.log(decodedValue);
   return decodedValue;
  }
  return null;
}


//getting info from db
router.get("/survey", (req,res)=>{
  surveyItem.find((err,item)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json(item);
      }
  })
})



//add
router.post("/add",verifyToken, (req,res)=>{
  let token = req.headers.authorization
  let decodedValue = decodingJWT(token);
  console.log("Decoded value", decodedValue)
  let newsurveyItem = new surveyItem({
    surveyName: req.body.surveyName,
    option1: req.body.option1,
    option2: req.body.option2,
    email:decodedValue.email
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
router.post("/update/:id",verifyToken, (req, res)=>{
  let id = mongoose.Types.ObjectId(req.params.id)
  surveyItem.findOneAndUpdate({_id: id},{
    $set:{
      surveyName : req.body.surveyName,
      option1 : req.body.option1,
      option2: req.body.option2,
      token: req.header.authorization.split(" ")[1]
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
  surveyItem.findById(id, (err,item)=>{
    res.json(item)
  })
})

//delete
router.delete("/delete/:id",verifyToken, (req,res)=>{
  let id = mongoose.Types.ObjectId(req.params.id)
  surveyItem.remove({_id: (id)}, (err,result)=>{
    if(err){
      res.json(err)
    }else{
      res.json(result)
    }
  })
})


//analysis Data
router.get("/userstats",(req,res)=>{
  let token = req.headers.authorization
  decodedToken = decode(token)

  surveyItem.find(({email:decodedToken.email}),(err,item)=>{
    if(err){
      console.log(err)
    }else{
      //let data = item.surveyName
      res.json(item)
    }
  })
})

// counter
router.get("/counter/:id",(req,res)=>{
  let id = mongoose.Types.ObjectId(req.params.id)
  surveyItem.findByIdAndUpdate({_id:id},{$inc:{count:1}},(err,item)=>{
    if(err){
      console.log("This is Error")
      res.status(500)
      console.log(err)
    }else{
      res.json({count: item.count})
    }
  })
})

module.exports = router;
