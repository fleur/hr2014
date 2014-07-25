var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var x = this._storage.get(i);

  if(!x){
    this._storage.set(i, []);
  }

  x = this._storage.get(i);
  x.push(k);
  x.push(v);
}

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var arr = this._storage.get(i);

  // arr -> [key1,val1,key2,val2,..,..]
  for(var i = 0; i < arr.length; i+=2){
    if(arr[i] === k){
      return arr[i+1];
    }
  }

  return null;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var arr = this._storage.get(i);

  for(var i = 0; i < arr.length; i+=2){
    if(arr[i] === k){
      arr.splice(i, 2);
    }
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
