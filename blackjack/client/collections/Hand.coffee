class window.Hand extends Backbone.Collection

  model: Card

  initialize: (array, @deck, @isDealer) ->
    # if @isDealer @on 'stand' () => @dealerTurn

  hit: ->
    last = @add(@deck.pop()).last()
    if (@isDealer and @dealerScore() > 21) or (@scores()[0] > 21)
      @trigger('bust', @)
    last

  scores: ->
    # The scores are an array of potential scores.
    # Usually, that array contains one element. That is the only score.
    # when there is an ace, it offers you two scores - the original score, and score + 10.
    hasAce = @reduce (memo, card) ->
      memo or card.get('value') is 1
    , false
    score = @reduce (score, card) ->
      score + if card.get 'revealed' then card.get 'value' else 0
    , 0
    if hasAce then [score, score + 10] else [score]

  playerScore: ->
    score = @scores()
    if (score[1]? and score[1] <= 21)
      score[1]
    else
      score[0]

  dealerScore: ->
    # An Ace in the dealer's hand is always counted as 11
    # if possible without the dealer going over 21.
    score = @scores();
    if (score[1]? and 21 >= score[1] and (@first().revealed or score[1] == 1))
      score[1]
    else
      score[0]

  dealerTurn: ->
    if @isDealer
      @first().flip()
      until @dealerScore() >= 17
        @hit()

