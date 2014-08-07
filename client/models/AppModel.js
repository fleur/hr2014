// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', null);
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    //anytime a songModel gets played, the below method gets triggered
    params.library.on('play', function(song){
      //song refers to the songModel that was triggered
      this.set('currentSong', song);
      //this refers to the current instance of AppModel (app)
    }, this);

    params.library.on('ended', function() {
      console.log('hihihihihi')
      var song = this.get("songQueue").pop();
      console.log(this.get('songQueue'))
      this.set("currentSong", song);
    }, this);

    params.library.on('enqueue',function(song){
      this.get('songQueue').enqueue(song);
      // var queue = this.get('songQueue');

      // if(queue.length === 0 && this.get('currentSong') === null) {

      //   song.play();
      // } else {

      //   var tmp = new Song()
      //   queue.unshift(song);
      console.log("full queue:", this.get('songQueue'))
      //   console.log("queued: ", song.attributes);
      //}
    },this);
  }

});
