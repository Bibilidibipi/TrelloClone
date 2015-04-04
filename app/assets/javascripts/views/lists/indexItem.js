TrelloClone.Views.ListIndexItem = Backbone.View.extend({
  template: JST['lists/indexItem'],
  tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    // 'click .submit': 'showList'
  },

  showList: function (event) {
    event.preventDefault();
    Backbone.history.navigate('lists/' + this.model.id, { trigger: true });
  },

  render: function() {
    this.$el.html(this.template({ list: this.model }));
    return this;
  }
});
