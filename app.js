var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');
var Joke = require('./models/joke.js');
mongoose.Promise = require('bluebird');

var joke = require('./routes/joke');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'false'
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/jokes', express.static(path.join(__dirname, 'dist')));
app.use('/api/joke', joke);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function getJokes() {
  request.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten', function (err, response, body) {
    if (!err && response.statusCode == 200) {
      var jokes = JSON.parse(body);
      var data = mapJokes(jokes);
      insertJokes(data);
    }
  });
};

function mapJokes (jokes) {
  const now = new Date().toISOString();
  return jokes.map(joke => ({
    type: joke.type,
    setup: joke.setup,
    punchline: joke.punchline,
    createDate: now
  }));
}

function insertJokes(data) {
  Joke.collection.insertMany(data)
}


mongoose.connect('mongodb://localhost/rest', {
    promiseLibrary: require('bluebird')
  })
  .then(() => {
    console.log('connection succesful')
    getJokes();
  })
  .catch((err) => console.error(err));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(err)
});

module.exports = app;
