Template.area.helpers({
        "userIsOwner": function () {
            console.log(Areas.findOne({_id: this._id}).user === Meteor.userId());
            return Areas.findOne({_id: this._id}).user === Meteor.userId();
        },

        "saved": function () {
            var exist = SavedAreas.findOne({user: Meteor.userId(), area: this._id});
            return exist != null;
        }
    }
);
Template.area.events({
    "change .isPublic": function () {
        Meteor.call("updateAreaPublic", this._id, event.target.checked);

    },
    "change .isSaved": function () {
        var save = event.target.checked;
        if (save === true) {
            Meteor.call("insertSavedArea", Meteor.userId(), this._id);
        } else {
            Meteor.call("removeSavedArea", Meteor.userId(), this._id);
        }
    }


});
