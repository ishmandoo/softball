Players = new Mongo.Collection("players");
posNames = ['Sit', 'P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'RC', 'LC', 'LF', 'Sit']

if (Meteor.isClient) {

  Template.field.helpers({
    players: function () {
      return Players.find({});
    }
  });

  Template.lineup.helpers({
    players: function () {
      return Players.find({});
    },
    posNames: function(pos) {
      return posNames[pos];
    }
  });

  Template.lineup.events({
    "submit .new-player": function (event) {

      var name = event.target.text.value;

      Players.insert({
        name: name,
        pos: 0,
        bat: Players.find({}).count()
      });

      event.target.text.value = "";

      return false;
    }
  });

  Template.player.events({
    "click .delete": function () {
      Players.remove(this._id);
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    Sortable.collections = ["players"];
  })
}
