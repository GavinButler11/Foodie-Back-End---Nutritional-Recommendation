var mongoose = require('mongoose');
var schema = new mongoose.Schema({ profiles: Array });
module.exports = mongoose.model('Profile', schema);