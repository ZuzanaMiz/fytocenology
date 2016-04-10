Template.galeria.helpers({

    reportPhotos: function () {

        return Photos.find({idReport: Session.get("report")});
    }

});

Template.galeria.events({

    'click .remove': function () {
        var gallery = $('#blueimp-gallery').data('gallery');
        var index = gallery.getIndex();
        var image = $('#links > a > img').get(index).getAttribute('data-photoId');

        Meteor.call("removePhoto", image);
    },
    'submit .uploadPicture': function () {
        var picture = pictureUpload.value;
        // var picture=FileReader.readFile(picturePath);
        Meteor.call("savePhoto", picture, this._id);

        console.log("save " + picture);
        return false;
    }

});

Template.showPicture.helpers({
    'setActualPhoto': function () {
        Session.set("actualPhoto", this._id);
    }

});