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
    'change .pictureUpload': function () {
        var files = pictureUpload.value; // FileList object

        // files is a FileList of File objects. List some properties.
        var reader = new FileReader();
        var picture = reader.readAsBinaryString(files);



        Meteor.call("savePhoto", picture, this._id);

        console.log("save " + picture);
        return false;
    },


    'click .analyze': function() {
        var previewImage = $('#blueimp-gallery .modal-body img').get(0);
        var canvas = $('#cvCanvas').get(0);
        var imgWidth = previewImage.naturalWidth;
        var imgHeight = previewImage.naturalHeight;

        canvas.setAttribute('width', imgWidth);
        canvas.setAttribute('height', imgHeight);

        var ctx = canvas.getContext('2d');
        ctx.drawImage(previewImage, 0, 0);

        var imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

        var gray_img = new jsfeat.matrix_t(imgWidth, imgHeight, jsfeat.U8_t | jsfeat.C1_t);
        jsfeat.imgproc.grayscale(imageData.data, imgWidth, imgHeight, gray_img);


        var data_u32 = new Uint32Array(imageData.data.buffer);
        var alpha = (0xff << 24);
        var i = gray_img.cols*gray_img.rows, pix = 0;
        while(--i >= 0) {
            pix = gray_img.data[i];
            data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
        }

        ctx.putImageData(imageData, 0, 0);
    }

});

Template.showPicture.helpers({
    'setActualPhoto': function () {
        Session.set("actualPhoto", this._id);
    }

});