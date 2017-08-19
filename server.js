var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var auth = require('./controllers/auth');
var message = require('./controllers/message');
var meal = require('./controllers/meal');
var profiles = require('./controllers/profile');
var result = require('./controllers/result');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/message', message.get);
app.post('/api/message', message.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.get('/api/users', auth.get);
app.get('/api/foods', meal.get);
app.post('/api/foods', meal.post);
app.get('/api/profiles', profiles.get);
app.post('/api/profiles', profiles.post);
app.get('/api/results', result.get);
app.get('/api/findRecommendedFood', result.foodFinder);

mongoose.connect("mongodb://localhost:27017/test", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    } else {
	console.log("Error connecting to mongo");
    }
});

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port);
});
