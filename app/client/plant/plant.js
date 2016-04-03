Template.plant.events({
    'click .delete': function () {
        Meteor.call("removePlant", this._id);
    }
});
