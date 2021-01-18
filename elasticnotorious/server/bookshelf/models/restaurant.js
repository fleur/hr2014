var db = require('../config');

var Resturant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

});

module.exports = Resturant;
