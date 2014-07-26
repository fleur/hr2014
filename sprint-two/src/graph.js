var Graph = function(){
  this.storage = [];
  this.edgeStor = [];
};

Graph.prototype.addNode = function(newNode, toNode){
  if (this.storage.length === 1){
    this.edgeStor.push([this.storage[0],newNode]);
  }
  this.storage.push(newNode);

  if (toNode) {
    this.storage.push(toNode);
    this.edgeStor.push([newNode, toNode]);
  }
};

Graph.prototype.contains = function(node){
  for (var i = 0; i < this.storage.length; i++){
    if (node === this.storage[i]){
      return true;
    }
  }
  return false;
};

Graph.prototype.removeNode = function(node){
  var len = this.storage.length;
  for (var i = 0; i < len; i++){
    if (node === this.storage[i]){
      this.storage.splice(i, 1);
      break;
    }
  }
};

Graph.prototype.getEdge = function(fromNode, toNode){
  var result = false;
  _.each(this.edgeStor, function(edge){
    if ( edge[0] === fromNode && edge[1] === toNode) {
      result = true;
    }
  });
  return result;
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this.edgeStor.push([fromNode, toNode]);
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  for (var i = 0; i < this.edgeStor.length; i++){
    if (this.edgeStor[i][0] === fromNode && this.edgeStor[i][1] === toNode){
       this.edgeStor.splice(i,1);
       break;
    }
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
