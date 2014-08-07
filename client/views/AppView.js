// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  //params would be {model: app}
  initialize: function(params){

    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});
    this.currentSongView = new CurrentSongView();
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'

    //this.model.on()
    var context = this;
    var queue = this.model.get('songQueue');
    this.model.get("library").on('enqueue', function() {
      console.log("got queue add");
      context.songQueueView.render();
    });
//     queue.on('remove', function() {
//       console.log("got queue remove");
//       this.songQueueView.render();
//     }, this);
//
    //event listener for any change in current song
    this.model.on('change:currentSong', function(model){
      //sets URl for the audio player
      this.playerView.setSong(model.get('currentSong'));
      this.currentSongView.setSong(model.get('currentSong'));
    }, this);

  },

  render: function(){
    return this.$el.html([
      this.currentSongView.$el,
      //appends audio player to DOM
      this.playerView.$el,
      //appends library list to DOM
      this.libraryView.$el,
      this.songQueueView.$el
    ]);
  }

});
