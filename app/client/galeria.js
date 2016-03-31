Template.galeria.helpers({

    reportPhotos: function () {

        return Photos.find({idReport: Session.get("report")});
    }
    //resizePicture: function (picture) {
    //    picture.high = 50;
    //    picture.width = 50;
    //    return picture;
    //}

});