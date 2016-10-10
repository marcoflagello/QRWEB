var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');


var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);





//var users = require('./routes/users');
var about = require('./routes/about');
var crea_luogo = require('./routes/crea_luogo');
//var uploads = require('./routes/uploads');
var modifica = require('./routes/modifica');
var luoghi = require('./routes/luoghi');
var insert = require('./routes/insert');
var insert_img = require('./routes/insert_img');
var update = require('./routes/update');
var cancella = require('./routes/cancella');
var del = require('./routes/delete');
var del_img = require('./routes/delete_img');
var luogo = require('./routes/luogo');
var luogo_r = require('./routes/luogo_r');
var stampaQr = require('./routes/stampaQr');
//var signup = require('./routes/signup');
//var qrgenerator = require('./routes/qrgenerator');

//var db = require('./routes/db');




var app = express();



// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(expressSession({cookie: { maxAge: 60000 }}));
app.use(express.static(path.join(__dirname, 'bin')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);



var routes = require('./routes/index')(passport);
app.use('/', routes);

//app.use('/users', users);

app.use('/about', about);
app.use('/crea_luogo', crea_luogo);
//app.use('/uploads', uploads);
app.use('/insert', insert);
app.use('/insert_img', insert_img);
//app.use('/getdata', db);
app.use('/luoghi', luoghi);
app.use('/modifica', modifica);
app.use('/update', update);
app.use('/cancella', cancella);
app.use('/delete', del);
app.use('/delete_img', del_img);
app.use('/luogo', luogo);
app.use('/luogo_r', luogo_r);
app.use('/signup', routes);
app.use('/login', routes);
app.use('/stampaQr', stampaQr);

//app.use('/qrgenerator', qrgenerator);
//


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
