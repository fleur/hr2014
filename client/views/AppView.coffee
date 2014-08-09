class window.AppView extends Backbone.View

  template: _.template '
    <button class="hit-button">Hit</button>
    <button class="stand-button">Stand</button>
    <button class="reset-button" style="display:none;">Reset</button>
    <div class="player-wallet-container"></div>
    <div class="player-hand-container"></div>
    <div class="dealer-hand-container"></div>
  '

  events:
    "click .hit-button": -> @model.get('playerHand').hit()
    "click .stand-button": -> @model.get('dealerHand').dealerTurn(); @model.whoWon(); @toggleButtons()
    "click .reset-button": -> @model.deal(); @setListeners(); @render()

  initialize: ->
    @setListeners()
    @render()

  toggleButtons: ->
    $('.hit-button').hide();
    $('.stand-button').hide();
    $('.reset-button').show();

  setListeners: ->
    @model.get('playerHand').on 'bust', => @model.whoWon(); @toggleButtons()
    @model.get('dealerHand').on 'bust', => @model.whoWon(); @toggleButtons()

  render: ->
    @$el.children().detach()
    @$el.html @template()
    @$('.player-hand-container').html new HandView(collection: @model.get 'playerHand').el
    @$('.player-wallet-container').html new WalletView(model: @model.get 'wallet').el
    @$('.dealer-hand-container').html new HandView(collection: @model.get 'dealerHand').el
