class window.CardView extends Backbone.View

  tagName: 'img'

  className: 'card'

  template: _.template 'img/cards/<%= rankName %>-<%= suitName %>.png'

  initialize: ->
    @model.on 'change', => @render
    @render()

  render: ->
    @$el.children().detach().end().html
    if (@model.get('revealed'))
      img = @template @model.attributes
    else
      img = 'img/card-back.png'
    @$el.attr 'src', img
    @$el.addClass 'covered' unless @model.get 'revealed'
