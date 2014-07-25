var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var newNode = makeNode(value);
    if (this.tail !== null){
      this.tail.next = newNode;
    }
    this.tail = newNode;

    // head only gets set once and that node stays as the head until removed.
    if (this.head === null) {
      this.head = newNode;
    }
  };

  list.removeHead = function(){
    var oldHead = this.head;
    if (this.head === this.tail){
      this.tail = null;
    }
      this.head = this.head.next;

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

  return list;
};

var makeNode = function(value){
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
