

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


var scrapeMagic = function() {

  console.log("scraping /api/ticker");
  $.ajax({

    url: "/api/ticker",

  }).done(function(output) {

    console.log(output);

    var ticker = [];
    var rows = $(output).find("#report").find("tbody").children();

    // gather an array of all the ticker symbols
    rows.each(function(err, value) {
      // ticker symbol in the 2nd td element
      var $cells = $(value).find("td");
      ticker.push($($cells[1]).text());
    });

    // prepopulate the input box with a list
    // of all the ticker symbols we scraped
    $("#ticker").val(ticker.join(','));

  }).fail(function(err) {

    console.log('the thing failed with an error');
    console.log(err.responseText);
  });

};
