

var getData = function(ticker, cb) {
  var baseTmpl = _.template("http://query.yahooapis.com/v1/public/yql?diagnostics=true&env=store://datatables.org/alltableswithkeys&format=json");
  var qTmpl = _.template("select Symbol,Date,Close from yahoo.finance.historicaldata where symbol = \"<%= ticker %>\" and startDate = \"2014-01-01\" and endDate = \"2014-08-24\"");

  $.ajax({
    url: baseTmpl({ticker: ticker}),
    data: {
      q: qTmpl({ticker: ticker}),
      format: 'json'
    },
    // beforeSend: function (jqXHR, settings) {
    //   url = settings.url + "?" + settings.data;
    //   console.log(url);
    // },
  }).done(function(output) {

    var data = output.query.results.quote;
    //console.log(output);

    cb(null, ticker, data);

  }).fail(function(err) {

    console.log('the thing failed with an error');
    console.log(err.responseText);
    cb(err.responseText, ticker, null);
  });

};


var parseMagic = function() {

  $.ajax({
    url: "/magic.html",
    data: {
      q: qTmpl({ticker: ticker}),
      format: 'json'
    },
    // beforeSend: function (jqXHR, settings) {
    //   url = settings.url + "?" + settings.data;
    //   console.log(url);
    // },
  }).done(function(output) {

    var data = output.query.results.quote;
    //console.log(output);

    cb(null, ticker, data);

  }).fail(function(err) {

    console.log('the thing failed with an error');
    console.log(err.responseText);
    cb(err.responseText, ticker, null);
  });

};

//http://query.yahooapis.com/v1/public/yql?diagnostics=true&env=store://datatables.org/alltableswithkeys&format=json&q=select+Symbol%2CDate%2CClose+from+yahoo.finance.historicaldata+where+symbol+%3D+%22GOOG%22+and+startDate+%3D+%222013-02-11%22+and+endDate+%3D+%222014-02-18%22&format=json?undefined
