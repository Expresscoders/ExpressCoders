let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require("cors")
let mongoose = require("mongoose")

mongoose.connect("mongodb+srv://chaitanya:MongoDB@cluster0.e8ef8.mongodb.net/surveys?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true},(err,connected)=>{
  if(err){
    console.log("err")
  }
  else{
    console.log("connected to mongodb")
  }
})



let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static(path.join(__dirname," ./public/surveys/")));
app.use('/users', usersRouter);
app.use((req,res,next)=> {
  res.sendFile(path.join(__dirname,"./public/surveys","index.html"))
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
