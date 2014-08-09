class window.Wallet extends Backbone.Model

  initialize: ->
    @set 'wallet', 500
    @set 'bet', 0

  bet: (amount) ->
    bet = @get 'bet'
    wallet = @get 'wallet'
    if 0 < amount <= wallet or -bet <= amount < 0
      @set 'wallet', wallet - amount
      @set 'bet', bet + amount

  won: ->
    @set 'wallet', 2 * @get('bet') + @get('wallet')
    @set 'bet', 0

  lost: ->
    @set 'bet', 0

  tied: ->
    @set 'wallet', @get('wallet') + @get('bet')
    @set 'bet', 0
