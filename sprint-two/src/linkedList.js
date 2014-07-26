var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var newNode = makeNode(value);

    if (this.tail === null){
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    // head only gets set once and that node stays as the head until removed.
    if (this.head === null) {
      this.head = newNode;
    }
  };

  list.removeHead = function(){
    var oldHead = this.head;

    if (this.head === this.tail){
      // we're removing one element from a one element list
      // so head and tail become null
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.previous = null;
    }

    return oldHead.value;
  };

  list.contains = function(target){
    var someNode = this.head;
    while(someNode !== null){
      if (someNode.value === target){
        return true;
      }
      someNode = someNode.next;
    }
    return false;
  };

  list.addHead = function(value) {
    var newNode = makeNode(value);

    this.head.previous = newNode;
    newNode.next = this.head;
    this.head = newNode;
  };

  list.removeTail = function() {
    var oldTail = this.tail;
    var newTail = this.tail.previous;

    newTail.next = null;
    this.tail = newTail;

    return oldTail.value;
  };

  return list;
};

var makeNode = function(value){
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
