// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  this._top = top;
  this._left = left;
  this._timeBetweenSteps = timeBetweenSteps;

  // use jQuery to create an HTML <span> tag
  this.$node = jQuery('<span class="dancer"></span>');

  this.step();

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);
};

Dancer.prototype.step = function(){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    //setTimeout(this.step.bind(this), this._timeBetweenSteps);

    var context = this;

    setTimeout(function() { context.step(); }, this._timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left){
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
};

Dancer.prototype.lineup = function() {
  this.$node.css("left", 10);
};

Dancer.prototype.getPosition = function() {
  var arr = [];
  arr.push(parseInt(this.$node.css('left')));
  arr.push(parseInt(this.$node.css('top')));
  return arr;
};
/*
Dancer.prototype.move(toX, toY, interval) {
  var currX = $node.css("left");
  var currY = $node.css("top");
  console.log('currX: ', currX, "currY: ", currY);

  //Keep on moving the image till the target is achieved
  if(currX<toX) newX = currX + interval;
  if(currY<toY) newY = currY + interval;

  $node.css("top", newY);
  $node.css("left",newX);

  if ((newX+interval < toX) && (newY+interval < toY)) {
    //Keep on calling this function every 100 microsecond
    //  till the target location is reached
    window.setTimeout(this.move.bind(this, toX, toY, interval),100);
  }
};
  */
