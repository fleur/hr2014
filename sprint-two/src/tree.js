var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = [];

  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;

  return newTree;
};




var treeMethods = {};

treeMethods.addChild = function(value){
  var t = makeTree(value);

  if (this.children === undefined) {
    this.children = [];
  }

  this.children.push(t);
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
