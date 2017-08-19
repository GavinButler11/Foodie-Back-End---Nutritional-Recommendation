var async = require('async');
var FoodTypes = require('../models/food_types');
var Meals = require('../models/meals');

module.exports = {

    get: function (req, res) {
        var url = req.originalUrl;
        var food_type = url.substr(url.indexOf('=') + 1);
        FoodTypes.find({
            category: food_type
        }).populate('food_types').exec(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    },
    
    post: function(req, res) {
        var user = req.body[0];
        var datetime = req.body[1];
        var type = req.body[2];
        var food_data = req.body[3];
        
        var foods = [];
        var food_names = [];
        var nutritionObj = {carbs: 0, fat: 0, protein: 0};
        
        for(var i = 0; i < food_data.length; i++) {
            food_names.push(food_data[i].food);
            foods.push({name: food_data[i].food, size: food_data[i].size});
        }
        
        FoodTypes.aggregate([
            {$match: {name: {$in: food_names}}},
            {$group: {_id: null, fat: {$sum: '$fat'}, protein: {$sum: '$protein'}, carbs: {$sum: '$carbs'}}}
        ], function(err, result) {
            var nutritionData = result[0];
            if (err) {
                return next(err);
            } else {
                var meal = new Meals({
                    user: user,
                    time: datetime,
                    type: type,
                    foods: foods,
                    nutrition: {fat: nutritionData.fat, protein: nutritionData.protein, carbs: nutritionData.carbs}
                });
                meal.save(function(err, post) {
                    if(err) {
                        return next(err);
                    }
                });
            }
        });
    }
}
