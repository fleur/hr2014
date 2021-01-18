/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /restaurants              ->  index
 * POST    /restaurants              ->  create
 * GET     /restaurants/:id          ->  show
 * PUT     /restaurants/:id          ->  update
 * DELETE  /restaurants/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Restaurants = require('../../bookshelf/collections/restaurants');

// Get list of things
exports.index = function(req, res) {

  if (req.method === 'GET') {

    Restaurants
      .query({where: req.query})
      .fetch()
      .then(function(found) {

        if (found) {

          res.send(201, found);

        } else {

          res.send(404);
        }

      })
      .otherwise(function(err) {

        console.log(err);
        res.send(400);
      });

  } else if (req.method === 'POST') {


    // get JSON object from request
    // add to database
    // return 201 on success
    // return URL to get entity with as Location field
    // on failure, return 400
    res.send(501); 


  } else {

    // return 501 not implemented
    res.send(501); 
  }
};