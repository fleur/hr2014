var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.start = 0;
  this.end = 0;
  this.qSize = 0;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.start] = value;
  this.start++;
  this.qSize++;
};

Queue.prototype.dequeue = function() {
  var rv;
  rv = this.storage[this.end];
  this.end++;
  if(this.qSize > 0) {
    this.qSize--;
  }
  return rv;
};

Queue.prototype.size = function() {
  return this.qSize;
};
