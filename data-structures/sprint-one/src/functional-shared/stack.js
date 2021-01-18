var makeStack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = {};

  someInstance.storage = {};
  someInstance.stackSize = 0;

  someInstance.push = stackMethods.push;
  someInstance.pop = stackMethods.pop;
  someInstance.size = stackMethods.size;

  return someInstance;
};

var stackMethods = {
  push: function(value){
      this.storage[this.stackSize] = value;
      this.stackSize++;
  },

  pop: function(){
    if (this.stackSize > 0){
      var temp = this.storage[this.stackSize - 1];
      this.stackSize--;
    }
    return temp;
  },

  size: function(){
    return this.stackSize;
  }
};


