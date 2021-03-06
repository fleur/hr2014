var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var mongodb = require("mongodb");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
var sites = [];

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public/'),
  'archivedSites' : path.join(__dirname, '../archives/sites/'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};



// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  connection.query('SELECT url FROM Sites WHERE downloaded = 0', function(error, result) {
    if (error) {
      callback(error);
    }
    exports.log(result);
    callback(error, result);
  });
};

exports.log = function(string) {
  var logFilename = path.join(__dirname, "../web-historian.log");
  fs.appendFile(logFilename, string+'\n', function(error) {
    if (error) {
      console.log("failed writing to log file: "+logFilename+": "+error);
    };
  });
};

exports.downloadUrl = function(url, callback){

  saltwaterc.get({ url: url }, function (err, res) {
    var content = res.buffer.toString();
    var sql = "UPDATE Sites SET downloaded = 1, Content ='"+content+"' WHERE url = '"+url+"'";

    connection.query(sql, function(error) {
      if (error) {
        exports.log(error);
        exports.log('Error when updating table');
      }
      callback(err);
    });
  });
};

exports.closeMysql = function() {
  connection.end();
}
/*exports.isUrlInList = function(url){
  return (sites.indexOf(url) !== -1);
};*/

/*exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths, url, function(error) {
    callback(error);
  });
};*/

/*exports.isURLArchived = function(url, callback){
  var hash = crypto.Crypto.SHA1(url);
  exports.log("hashed url: " + hash);
  exports.log("checking to see if url is archived: " + url);

  connection.query('SELECT downloaded FROM Sites WHERE url = ? ', [url], function(error, result) {
    if (error) {
      exports.log(error);
      callback(false);
    }
    exports.log("results = : " + JSON.stringify(result));
  });
};*/


/*exports.downloadUrls = function(callback){
  var args = Array.prototype.slice.call(arguments, 1);

  for (var i=0; i<args.length; i++) {
    downloadUrl(args[i], callback);
  }
};*/


