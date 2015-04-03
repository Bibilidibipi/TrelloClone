TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',
  lists: function () {
    this._lists = this._lists || new TrelloClone.Collections.Lists();
    return this._lists;
  },

  parse: function (payload) {
    console.log(payload);
    if(payload.lists) {
      this.lists().set(payload.lists);
      delete payload.lists;
    }

    return payload;
  }
});
