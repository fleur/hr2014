var Graph = function(){
  this.storage = {};
  this.edgeStor = [];
};

Graph.prototype.addNode = function(newNode, toNode){
  var keys = Object.keys(this.storage);
  if (keys.length === 1){

    // automatically add edge from second node to the first node
    this.edgeStor.push([keys[0],newNode]);
  }

  this.storage[newNode] = true;

  if (toNode) {
    this.storage[toNode] = true; // totally unecessary per specs.
    this.edgeStor.push([newNode, toNode]);
  }
};

Graph.prototype.contains = function(node){
  for (var key in this.storage){
    if (node === key){
      return true;
    }
  }
  return false;
};

Graph.prototype.removeNode = function(node){

  for (var key in this.storage){
    if (node === key){
      delete this.storage[key];
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
  var deletedEdge = null;
  for (var i = 0; i < this.edgeStor.length; i++){
    if (this.edgeStor[i][0] === fromNode && this.edgeStor[i][1] === toNode){
       deletedEdge = this.edgeStor.splice(i,1)[0];
       break;
    }
  }
  if(deletedEdge) {
    var edges = this.edgeStor;
    var isEdgeLess = false;

    _.each(deletedEdge, function(node){
      isEdgeLess = _.every(edges, function (edge){
        if (node !== edge[0] && node !== edge[1]){
          return true;
        }
        return false;
      });

      if (isEdgeLess){
        delete this.storage[node];
      }
    }, this); // sending in the context of Graph for this.storage
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
