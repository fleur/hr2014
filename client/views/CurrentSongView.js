var CurrentSongView = Backbone.View.extend({

  template: _.template('<p>Current Song: (<%= artist %>)&nbsp;<%= title %></p>'),

  initialize: function(){
    this.render();
  },

  setSong: function(song){
    this.model = song;
    this.render();
  },

  render: function(){
    if(this.model===undefined){
      return this.$el.html('<p>Please pick a song</p>')
    }
    return this.$el.html(this.template(this.model.attributes));
  }

});
