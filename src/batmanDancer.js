var BatmanDancer = function(top, left, timeBetweenSteps){
  SuperheroDancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<span class="squaredancer"></span>');
  this.setPosition(top, left);
};
BatmanDancer.prototype = Object.create(SuperheroDancer.prototype);
BatmanDancer.prototype.constructor = BatmanDancer;

