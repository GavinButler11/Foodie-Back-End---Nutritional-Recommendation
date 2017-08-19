var FoodTypes = require('../models/food_types');
var Results = require('../models/meals');

module.exports = {
    
    get: function (req, res) {
        Results.find({
            
        }).populate('food_types').exec(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    },
    
    foodFinder: function(req, res) {
        //carbs,fat,protein
        var type = req.query.type;
        //amount of nutrient needed to add or take
        var val = req.query.value;
        //get all foods in meal
        var foods = req.query.foods.split(",");
        FoodTypes.find({
            
            //result returns all foods e.g Apple, carbs:13.81
        }, 'name ' + type, function(err, result) {
            var bestValue = 10000;
            var bestFood = "";
            //loops to find food that would improve if added/removed
            for(var i = 0; i < result.length; i++) {
                //if < too much
                //check if food was in meal
                if(val < 0 && foods.indexOf(result[i].name) == -1) {
                    continue;
                }
                //calculate how far off guideline after adding/removing food (each nutr food value - value)
                var difference = Math.abs(result[i][type] - Math.abs(val));
                //if diff < bestval then that is best food to add/remve so far
                if(difference < bestValue) {
                    bestValue = difference;
                    bestFood = result[i].name;
                    console.log(bestFood)
                }
            }
            res.send(bestFood);
        });
    }
}
