var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
});

var User = mongoose.model('user', userSchema);

module.exports = User;
