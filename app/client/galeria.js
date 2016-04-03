Template.galeria.helpers({

    reportPhotos: function () {

        return Photos.find({idReport: Session.get("report")});
    }

});

Template.galeria.events({

    'click .remove': function () {
        console.log("removing photo" + this._id);
        Meteor.call("removePhoto", this._id);
    }


});

Template.showPicture.helpers({
    'setActualPhoto': function () {
        Session.set("actualPhoto", this._id);
    }

});