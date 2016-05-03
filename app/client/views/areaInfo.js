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
        console.log(exp);
        return Meteor.call("getExposition", exp);
    },


});
