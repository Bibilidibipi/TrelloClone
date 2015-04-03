TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  url: 'api/lists',

  getOrFetch: function(id) {
    var lists = this;
    var list = this.get(id);

    if(list !== undefined) {
      list.fetch();
    } else {
      list = new TrelloClone.Models.List({ id: id });
      list.fetch({
        success: function () {
          lists.add(list);
        }
      });
    }

    return list;
  }
});
