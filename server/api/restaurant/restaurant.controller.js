/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /resturant              ->  index
 * POST    /resturant              ->  create
 * GET     /resturant/:id          ->  show
 * PUT     /resturant/:id          ->  update
 * DELETE  /resturant/:id          ->  destroy
 */

'use strict';

var Restaurant = require('../../bookshelf/models/restaurant');

// Get list of things
exports.index = function(req, res) {

  console.log("are we even getting in here");
  
  if (req.method === 'GET') {

    findRestaurant({id: req.params.id}, function(err, restaurant) {

      if (err) {

        console.log(err);
        res.send(400, err);

      } else if (restaurant) {

        res.send(201, restaurant);

      } else {

        res.send(404, "restaurant not found");

      }
    });

  } else if (req.method === 'POST') {

    findRestaurant(req.body, function(err, restaurant) {

      if (err) {

        console.log(err);
        res.send(400, err);

      } else if (restaurant) {

        res.send(302, "restaurant already exists");

      } else {
        
        saveRestaurant(req, res, req.body);
      }
    });

  } else {

    // return 501 not implemented
    res.send(501); 
  }
};

var saveRestaurant = function(req, res, data) {

  var restaurant = new Restaurant(data);
  restaurant.save()
  .then(function(found) {

    res.send(201, found);
  })
  .otherwise(function(err) {
    
    console.log(err);
    res.send(400);
  });
};

var findRestaurant = function(data, callback) {

  new Restaurant(data)
  .fetch()
  .then(function(found) {

    callback(null, found);

  })
  .otherwise(function(err) {

    callback(err, null);

  });
};

