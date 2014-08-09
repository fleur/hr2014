#todo: refactor to have a game beneath the outer blackjack model
class window.App extends Backbone.Model

  initialize: ->
    @set 'deck', deck = new Deck()
    @deal()

  deal: ->
    deck = @get('deck')
    if deck.length < 10
      @set 'deck', deck = new Deck()
    @set 'playerHand', deck.dealPlayer()
    @set 'dealerHand', deck.dealDealer()

  whoWon: ->
    dealer = @get 'dealerHand'
    player = @get 'playerHand'

    if dealer.dealerScore() > 21
      player.trigger('win')
    else if player.playerScore() > 21
      dealer.trigger('win')
    else if dealer.dealerScore() < player.playerScore()
      player.trigger('win')
    else if dealer.dealerScore() > player.playerScore()
      dealer.trigger('win')
    else
      dealer.trigger('tie')
      player.trigger('tie')
