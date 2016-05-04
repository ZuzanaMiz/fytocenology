Template.infoPanelAreaBody.helpers({
    areaPlace: function () {
        return Areas.findOne({_id: Session.get("Area")}).place;
    },
    areaHigh: function () {
        return Areas.findOne({_id: Session.get("Area")}).high;
    },
    areaDescription: function () {
        return Areas.findOne({_id: Session.get("Area")}).description;
    },
    areaExposure: function () {
        var exp = Areas.findOne({_id: Session.get("Area")}).exposure;
        return Cardinals.findOne({degree: parseInt(exp)}).name;
    },

    gps1Long: function () {
        return Areas.findOne({_id: Session.get("Area")}).gps1.longitude;
    },
    gps1Lat: function () {
        return Areas.findOne({_id: Session.get("Area")}).gps1.latitude;
    },
    gps2Long: function () {
        return Areas.findOne({_id: Session.get("Area")}).gps2.longitude;
    },
    gps2Lat: function () {
        return Areas.findOne({_id: Session.get("Area")}).gps2.latitude;
    }



});
