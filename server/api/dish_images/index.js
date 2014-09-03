'use strict';

var express = require('express');
var controller = require('./dish_images.controller');

var router = express.Router();

router.get('/:id', controller.index);

module.exports = router;