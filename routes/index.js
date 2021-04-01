let express = require('express');
let router = express.Router();

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
