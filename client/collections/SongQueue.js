// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){

  },

  enqueue: function(song){
    console.log(this.length)
    if(this.length === 0){
      song.play();
      this.unshift(song);
    } else {
      this.unshift(song);
    }
  }

});
