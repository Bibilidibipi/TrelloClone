TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    console.log('once');
    this.$el.html(this.template({ board: this.model }));
    return this;
  }
});
