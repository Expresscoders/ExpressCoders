let express = require('express');
let router = express.Router();
let mongoose =  require('mongoose')
let db = "mongodb+srv://nikhil:MongoDB@mongodbserver.ytt43.mongodb.net/survey?retryWrites=true&w=majority"

mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true},  (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("connected to mongodb")
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/register',(req,res)=>{
  res.render('register')
})

router.get('/survey',(req,res)=>{
  res.render('survey')
})

module.exports = router;
