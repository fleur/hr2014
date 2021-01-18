var makeQueue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = Object.create(queueMethods);

  someInstance.storage = {};
  someInstance.queueSize = 0;

  // store numerical keys for first item in queue and last.
  someInstance.head = 0;
  someInstance.tail = 0;

  return someInstance;
};

var queueMethods = {};


  // Implement the methods below

  queueMethods.enqueue = function(value){
    this.storage[this.tail] = value;
    this.tail++;
    this.queueSize++;
  };

  queueMethods.dequeue = function(){
    var result = this.storage[this.head];

    this.head++;

    if (this.queueSize > 0){
      this.queueSize--;
    }

    return result;
  },

  queueMethods.size = function(){
    return this.queueSize;
  };
