TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .index': 'boardsIndex',
    'submit .new-list': 'newList'
  },

  render: function() {
    this.subviews('ul').forEach(function (indexItemView) {
      indexItemView.remove();
    }),
    this.$el.html(this.template({ board: this.model}));

    if(this.model.lists() === undefined) { return this; }

    this.model.lists().each(function (list) {
      var indexItemView = new TrelloClone.Views.ListIndexItem({ model: list });
      this.addSubview('ul', indexItemView);
    }.bind(this));

    return this;
  },

  boardsIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate('', { trigger: true });
  },

  newList: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    var list = new TrelloClone.Models.List(params);
    list.set("board_id", this.model.id);
    list.save({}, {
      success: function () {
        $form.find('.to-clear').val('');
        this.model.lists().add(list);
        this.model.fetch();
      }.bind(this)
    });
  }
});
