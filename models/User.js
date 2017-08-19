var mongoose = require('mongoose');

var schema = new mongoose.Schema({email: String, pwd: String});
module.exports = mongoose.model('User', schema);