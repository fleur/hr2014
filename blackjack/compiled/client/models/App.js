// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.App = (function(_super) {
    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.initialize = function() {
      this.set('deck', new Deck());
      this.set('wallet', new Wallet());
      return this.deal();
    };

    App.prototype.deal = function() {
      var deck;
      deck = this.get('deck');
      if (deck.length < 10) {
        this.set('deck', deck = new Deck());
      }
      this.set('playerHand', deck.dealPlayer());
      return this.set('dealerHand', deck.dealDealer());
    };

    App.prototype.whoWon = function() {
      var dealer, player, wallet;
      dealer = this.get('dealerHand');
      player = this.get('playerHand');
      wallet = this.get('wallet');
      if (dealer.dealerScore() > 21) {
        player.trigger('win');
        wallet.won();
      } else if (player.playerScore() > 21) {
        dealer.trigger('win');
        wallet.lost();
      } else if (dealer.dealerScore() < player.playerScore()) {
        player.trigger('win');
        wallet.won();
      } else if (dealer.dealerScore() > player.playerScore()) {
        dealer.trigger('win');
        wallet.lost();
      } else {
        dealer.trigger('tie');
        player.trigger('tie');
        wallet.tied();
      }
      return wallet.reset();
    };

    return App;

  })(Backbone.Model);

}).call(this);

//# sourceMappingURL=App.map