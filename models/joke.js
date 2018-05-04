var mongoose = require('mongoose');

var JokeSchema = new mongoose.Schema({
  type: String,
  setup: String,
  punchline: String
});

module.exports = mongoose.model('Joke', JokeSchema);