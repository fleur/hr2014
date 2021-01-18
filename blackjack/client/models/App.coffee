#todo: refactor to have a game beneath the outer blackjack model
class window.App extends Backbone.Model

  initialize: ->
    @set 'deck', new Deck()
    @set 'wallet', new Wallet()
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
    wallet = @get 'wallet'

    if dealer.dealerScore() > 21
      player.trigger('win')
      wallet.won()
    else if player.playerScore() > 21
      dealer.trigger('win')
      wallet.lost()
    else if dealer.dealerScore() < player.playerScore()
      player.trigger('win')
      wallet.won()
    else if dealer.dealerScore() > player.playerScore()
      dealer.trigger('win')
      wallet.lost()
    else
      dealer.trigger('tie')
      player.trigger('tie')
      wallet.tied()

    wallet.reset()
