// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.WalletView = (function(_super) {
    __extends(WalletView, _super);

    function WalletView() {
      return WalletView.__super__.constructor.apply(this, arguments);
    }

    WalletView.prototype.template = _.template('Wallet contains: $<%= wallet %>. ' + 'Bet: $<%= bet %><br><button class="add">+</button><button class="subtract">-</button>');

    WalletView.prototype.events = {
      'click .add': function() {
        return this.model.bet(10);
      },
      'click .subtract': function() {
        return this.model.bet(-10);
      }
    };

    WalletView.prototype.initialize = function() {
      this.model.on('placeBets', (function(_this) {
        return function() {
          return _this.showBetting();
        };
      })(this));
      this.model.on('change', (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
      return this.render();
    };

    WalletView.prototype.showBetting = function() {
      $('.add').show();
      return $('.subtract').show();
    };

    WalletView.prototype.render = function() {
      return this.$el.html(this.template(this.model.attributes));
    };

    return WalletView;

  })(Backbone.View);

}).call(this);

//# sourceMappingURL=WalletView.map