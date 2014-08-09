// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.template = _.template('<button class="hit-button">Hit</button> <button class="stand-button">Stand</button> <button class="reset-button" style="display:none;">Reset</button> <div class="player-wallet-container"></div> <div class="player-hand-container"></div> <div class="dealer-hand-container"></div>');

    AppView.prototype.events = {
      "click .hit-button": function() {
        return this.model.get('playerHand').hit();
      },
      "click .stand-button": function() {
        this.model.get('dealerHand').dealerTurn();
        this.model.whoWon();
        return this.toggleButtons();
      },
      "click .reset-button": function() {
        this.model.deal();
        this.setListeners();
        return this.render();
      }
    };

    AppView.prototype.initialize = function() {
      this.setListeners();
      return this.render();
    };

    AppView.prototype.toggleButtons = function() {
      $('.hit-button').hide();
      $('.stand-button').hide();
      return $('.reset-button').show();
    };

    AppView.prototype.setListeners = function() {
      this.model.get('playerHand').on('bust', (function(_this) {
        return function() {
          _this.model.whoWon();
          return _this.toggleButtons();
        };
      })(this));
      return this.model.get('dealerHand').on('bust', (function(_this) {
        return function() {
          _this.model.whoWon();
          return _this.toggleButtons();
        };
      })(this));
    };

    AppView.prototype.render = function() {
      this.$el.children().detach();
      this.$el.html(this.template());
      this.$('.player-hand-container').html(new HandView({
        collection: this.model.get('playerHand')
      }).el);
      this.$('.player-wallet-container').html(new WalletView({
        model: this.model.get('wallet')
      }).el);
      return this.$('.dealer-hand-container').html(new HandView({
        collection: this.model.get('dealerHand')
      }).el);
    };

    return AppView;

  })(Backbone.View);

}).call(this);

//# sourceMappingURL=AppView.map
