var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false         // use these settings
    }
});

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'http://www.magicformulainvesting.com/Account/LogOn';

casper.start(url, function() {
    // search for 'casperjs' from google form
    console.log("page loaded");
    this.fill('form#loginForm', {
        Email: 'hrsolo16@gmail.com',
        Password:  'w1nst0n'
    }, true);
});

casper.wait(3000, function() {
    this.echo("I've waited for 3 seconds.");
});

casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
    console.log(this);
    var f = document.querySelector('form');
    console.log(document);
    console.log("form: ", f);
    //f.querySelector('input[name=MinimumMarketCap]').value = '142';
    f.submit();
        // this.fill('form', {
    //     MinimumMarketCap: 142,
    // }, true);
});


casper.wait(3000, function() {
    this.echo("I've waited for 3 seconds more.");
});


casper.run(function() {
    console.log(this.getPageContent());
    this.exit();
});
