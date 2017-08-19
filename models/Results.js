var mongoose = require('mongoose');
var schema = new mongoose.Schema({ foods: Array, nutrition: Object });
module.exports = mongoose.model('Results', schema);