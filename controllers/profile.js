var Profile = require('../models/profile');

module.exports = {
    
    post: function (req, res) {
        console.log("Received on the backend " + req.body);
        var profile = []
        for(var i = 0; i < req.body.length; i++) {
            profile.push({age: req.body[i].age, height: req.body[i].height, weight: req.body[i].weight,})
        }
        
        var profile = new Profile({
            profile: profile
        });
            
        profile.save(function(err, post) {
            if(err) {
                return next(err);
            }
        });

        res.send("Complete");
    },
    
    get: function (req, res) {
        Profile.find({
        }).populate('profile').exec(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    }
        
}
