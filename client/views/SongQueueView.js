// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  events: {
    'enqueue': function() {
      console.log("queue caught enqueue event");
      this.render();
    },
    'dequeue': function() {
      console.log("queue caught dequeue event");
      this.render();
    }
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html('<th>Queue</th>').append(
      this.collection.map(function(song){
        return (new SongQueueEntryView({model: song})).render();
      })
    );
  }

});
