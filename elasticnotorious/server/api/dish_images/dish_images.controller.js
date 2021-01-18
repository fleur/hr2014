/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /dishes              ->  index
 * POST    /dishes              ->  create
 * GET     /dishes/:id          ->  show
 * PUT     /dishes/:id          ->  update
 * DELETE  /dishes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Images = require('../../bookshelf/collections/images');

// Get list of things
exports.index = function(req, res) {

  if (req.method === 'GET') {

    Images
      .query({where: {dish_id : req.query.dish_id }})
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

  } else {

    // return 501 not implemented
    res.send(501); 
  }
};