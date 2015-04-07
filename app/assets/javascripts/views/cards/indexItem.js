TrelloClone.Views.CardIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['cards/indexItem'],

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  }
});
