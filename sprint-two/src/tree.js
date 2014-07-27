var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  newTree.children = [];

  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;

  return newTree;
};




var treeMethods = {};

treeMethods.addChild = function(value){
  var newTree = makeTree(value);
  newTree.parent = this;

  if (this.children === undefined) {
    this.children = [];
  }

  this.children.push(newTree);
};

treeMethods.contains = function(target, result){
  result = result || false;

  if (this.value === target) {
    result = true;
  }

  for (var i=0; i<this.children.length; i++) {
    result = this.children[i].contains(target, result);
  }

  return result;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
