class window.AppView extends Backbone.View

  template: _.template '
    <button class="hit-button" style="display:none;">Hit</button>
    <button class="stand-button" style="display:none;">Stand</button>
    <button class="deal-button">Deal</button>
    <div class="player-wallet-container"></div>
    <div class="player-hand-container"></div>
    <div class="dealer-hand-container"></div>
  '

  events:
    "click .hit-button": -> @model.get('playerHand').hit()
    "click .stand-button": -> @model.get('dealerHand').dealerTurn(); @model.whoWon(); @toggleButtons()
    "click .deal-button": -> @deal()

  initialize: ->
    @playerHandView = new HandView(collection: @model.get 'playerHand')
    @dealerHandView = new HandView(collection: @model.get 'dealerHand')
    @walletView = new WalletView(model: @model.get 'wallet')
    @render()

  deal: ->
    @model.deal()
    @setListeners()
    @render()
    $('button').toggle()
    @playerHandView.render()
    @dealerHandView.render()

  toggleButtons: ->
    $('.hit-button').hide();
    $('.stand-button').hide();
    $('.deal-button').show();
    @walletView.showBetting()


  setListeners: ->
    @model.get('playerHand').on 'bust', => @model.whoWon(); @toggleButtons()
    @model.get('dealerHand').on 'bust', => @model.whoWon(); @toggleButtons()

  render: ->
    @playerHandView = new HandView(collection: @model.get 'playerHand')
    @dealerHandView = new HandView(collection: @model.get 'dealerHand')
    @$el.children().detach()
    @$el.html @template()
    @$('.player-wallet-container').html @walletView.el
    @$('.player-hand-container').html @playerHandView.el
    @$('.dealer-hand-container').html @dealerHandView.el
