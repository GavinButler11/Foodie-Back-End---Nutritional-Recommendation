var mongoose = require('mongoose');
var schema = new mongoose.Schema({ user: String, time: Date, type: String, foods: Array, nutrition: Object });
module.exports = mongoose.model('Meals', schema);