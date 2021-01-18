var makeBinarySearchTree = function(value){
  var obj = Object.create(BSTMethods);

  obj.value = value;
  obj.left = null;
  obj.right = null;

  return obj;
};

var BSTMethods = {
  insert: function(value){
    if(value < this.value){
      if(this.left){
        this.left.insert(value);
      } else {
        this.left = makeBinarySearchTree(value);
      }
    } else {
      if(this.right){
        this.right.insert(value);
      } else {
        this.right = makeBinarySearchTree(value);
      }
    }
  },

  contains: function(target){
    var result = false;

    if(this.value === target){
      result = true;
    } else if (target < this.value) {
      result = (this.left) ? this.left.contains(target) : false;
    } else if (this.value < target) {
      result = (this.right) ? this.right.contains(target) : false;
    }
    return result;
  },

  // more like depthFirstMap
  depthFirstLog: function(fn){
    fn(this.value);

    if(this.left){
      this.left.depthFirstLog(fn);
    }
    if(this.right){
      this.right.depthFirstLog(fn);
    }
  }
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
