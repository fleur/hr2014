class window.HandView extends Backbone.View

  className: 'hand'

  #todo: switch to mustache
  template: _.template '<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (<span class="score"></span>)' +
    '<span class="result"></span></h2>'

  initialize: ->
    @collection.on 'add remove change deal', => @render()
    @collection.on 'bust', => @$('.result').text(" BUST")
    @collection.on 'win', => @$('.result').text(" WIN")
    @collection.on 'tie', => @$('.result').text(" TIE")

  render: ->
    @$el.children().detach()
    @$el.html @template @collection
    @$el.append @collection.map (card) ->
      new CardView(model: card).$el
    if @collection.isDealer
      @$('.score').text @collection.dealerScore()
    else if @collection.scores()[1]?
      @$('.score').text @collection.scores()[0]+', '+@collection.scores()[1]
    else
      @$('.score').text @collection.scores()[0]
