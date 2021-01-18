var makeQueue = function(){ // FIFO
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;

  // store numerical keys for first item in queue and last.
  var head = 0;
  var tail = 0;

  // Implement the methods below

  someInstance.enqueue = function(value){
    storage[tail] = value;
    tail++;
    size++;
  };

  someInstance.dequeue = function(){
    var result = storage[head];

    head++;

    if (size > 0){
      size--;
    }

    return result;
  },

  someInstance.size = function(){
    return size;
  };

  return someInstance;
};
