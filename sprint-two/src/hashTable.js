var HashTable = function(){
  this._limit = 8;
  this.tuples = 0;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype._resize = function(limit){
  var oldStorage = this._storage;
  var context = this;

  console.log("resizing to: " , limit);
  this.tuples = 0;
  this._storage = makeLimitedArray(limit);

  oldStorage.each(function(value, key) {
    for (var i=0; i<value.length; i++) {

    }
    context.insert(key, value);
  });
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
  this.tuples++;
  console.log("added:", k);

  if (this.tuples > (this._limit*.75)) {
    this._limit *=2;
    this._resize(this._limit);
  }
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

  if (arr) {
    for(var i = 0; i < arr.length; i+=2){
      if(arr[i] === k){
        arr.splice(i, 2);
        this.tuples--;
        console.log("removed:", k);
      }
    }
  }

  console.log(this.tuples);
  if (this.tuples < (this.limit*.25)) {
    console.log("too big: " , 'tuples', this.tuples, 'limit cmp', (this._limit*.25));
    this.limit /= 2;
    this._resize(this.limit);
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
