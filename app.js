var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var cors = require('cors');
const config = require('config');

var app = express();
app.use(cors());
const index = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // sext locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


mongoose.Promise = bluebird;
const db_name = config.db_name;
mongoose.connect(`mongodb://${config.db_name}`)
    .then(() => {
        console.log(`Succesfully Connected to the Mongodb Database  at URL: ${config.db_name}`)
    })
    .catch(() => {
        console.log(`Error Connecting to the Mongodb Database at URL:${config.db_name}`)
    });



module.exports = app;