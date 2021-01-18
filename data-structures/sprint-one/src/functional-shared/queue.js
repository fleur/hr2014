var makeQueue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var q = {queueSize:0, head:0, tail:0, storage:{}};

  q.enqueue = queueMethods.enqueue;
  q.dequeue = queueMethods.dequeue;
  q.size = queueMethods.size;

  return q;
};

var queueMethods = {
    enqueue: function(value) {
        this.storage[this.tail] = value;
        this.queueSize++;
        this.tail++;
    },
    dequeue: function() {
        var rv = this.storage[this.head];
        this.queueSize = (this.queueSize > 0) ? this.queueSize -= 1 : 0;
        this.head++;
        return rv;
    },
    size: function() {
        return this.queueSize;
    }
};



