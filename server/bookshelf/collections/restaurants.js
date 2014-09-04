var db = require('../config');
var Resturant = require('../models/restaurant');

var Resturants = new db.Collection();


Resturants.model = Resturant;

module.exports = Resturants;
