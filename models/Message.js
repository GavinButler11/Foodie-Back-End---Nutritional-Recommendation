var mongoose = require('mongoose');

var schema = new mongoose.Schema({msg: String, user: {type: mongoose.Schema.ObjectId, ref: 'User'}});
module.exports = mongoose.model('Message', schema);