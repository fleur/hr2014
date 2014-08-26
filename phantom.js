
var webpage = require('webpage');
var page = webpage.create();
var url = 'http://www.magicformulainvesting.com/Account/LogOn';
/* waitFor from http://newspaint.wordpress.com/2013/04/05/waiting-for-page-to-load-in-phantomjs/ */
function waitFor( page, selector, expiry, callback ) {
  console.log( "- waitFor( " + selector + ", " + expiry + " )");

  // try and fetch the desired element from the page
  var result = page.evaluate(function (selector) {
    return document.querySelector( selector );
  }, selector);

  // if desired element found then call callback after 50ms
  if ( result ) {
    console.log( "- trigger " + selector + " found" );
    window.setTimeout(function () {
          callback( true );
    }, 50);
    return;
  }

  // determine whether timeout is triggered
  var finish = (new Date()).getTime();
  if ( finish > expiry ) {
    console.log( "- timed out" );
    callback( false );
    return;
  }

  // haven't timed out, haven't found object, so poll in another 100ms
  window.setTimeout(function () {
    waitFor( page, selector, expiry, callback );
  }, 100);
};


page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) {
    console.log('  ', item.file, ':', item.line);
  });
};

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onNavigationRequested = function(url, type, willNavigate, main) {
  console.log('Trying to navigate to: ' + url);
  console.log('Caused by: ' + type);
  console.log('Will actually navigate: ' + willNavigate);
  console.log('Sent from the page\'s main frame: ' + main);
};

var count = 0;
page.onLoadFinished = function() {

  console.log("step: ", count);
  page.render("phantom"+count+".png");
  if (count === 0) {
    // log in
    console.log("in page.evaluate");
    page.evaluate(function() {
      jQuery('#Email').val('hrsolo16@gmail.com');
      jQuery('#Password').val('w1nst0n');
      jQuery('[name="loginForm"] [name="login"]').click();
    });
    count++;

  } else if (count === 1) {
    console.log("should have logged in");
    page.evaluate(function() {
      jQuery('#MinimumMarketCap').val(142);
      jQuery('#stocks').click();
    });

  // now we need to wait for the stocks to show up
  waitFor(page, "#report", (new Date()).getTime() + 100000, function(status) {
    if (!status) {
      console.log("timed out waiting for report to load: ", status);
    }
    page.render("pjsfinal.png");
    phantom.exit();
});

  } else if (count === 2) {
    console.log("should have gotten stocks at this point");
  }

  console.log("url: ", document.URL);

};

page.open(url, function(status) {
  if (status !== "success") {
    console.log("failed to open page: ", url);
    phantom.exit();
  }
  console.log("opened page");




  // at this point we should have a page with stocks on it


});
