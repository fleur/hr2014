class window.WalletView extends Backbone.View

  template: _.template('Wallet contains: $<%= wallet %>. '+
    'Bet: $<%= bet %><br><button class="add">+</button><button class="subtract">-</button>')

  events:
    'click .add': -> @model.bet(10)
    'click .subtract': -> @model.bet(-10)

  initialize: ->
    @model.on 'placeBets', => @showBetting()
    @model.on 'change', => @render()
    @render()

  showBetting: ->
    $('.add').show();
    $('.subtract').show()

  render: ->
    @$el.html @template @model.attributes
