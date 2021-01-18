var makeStack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  var instance = Object.create(stackMethods);

  instance.storage = {};
  instance.stackSize = 0;

  return instance;
};

var stackMethods = {};
stackMethods.push = function(value){
  this.storage[this.stackSize] = value;
  this.stackSize++;
};

stackMethods.pop = function(){
  var temp;
  if (this.stackSize > 0) {
    temp = this.storage[this.stackSize-1];
    this.stackSize--;
    delete this.storage[this.stackSize+1];
  }
  return temp;

};

stackMethods.size = function(){
  return this.stackSize;
}
