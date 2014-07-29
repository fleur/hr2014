var SuperheroDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = jQuery('<span class="subtledancer"></span>');
  this.setPosition(top, left);
};
SuperheroDancer.prototype = Object.create(Dancer.prototype);
SuperheroDancer.prototype.constructor = SuperheroDancer;

SuperheroDancer.prototype.step = function(){
    // call the old version of step at the beginning of
    // any call to this new version of step
    Dancer.prototype.step.call(this);

    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    this.$node.fadeToggle();
  };

