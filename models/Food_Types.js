var mongoose = require('mongoose');

var schema = new mongoose.Schema({ name: String, category: String, carbs: Number, fat: Number, protein: Number});
module.exports = mongoose.model('Food_Types', schema);