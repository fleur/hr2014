
exports.logFilename = "htmlfetcher.log";

exports.log = function(string) {
  fs.appendFile(logFilename, string+"\n", function (err) {

    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}
