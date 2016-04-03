//Template.reportList.helpers({
//    reportId: function () {
//
//        var parts = location.href.split('/');
//        var id = parts.pop();
//        return Reports.find({areaId: id});
//    }});
Template.infoArea.events({

    'click .editMode': function () {
        Session.set("areaViewAndChange", true);
    },
    'click .removeArea': function () {
        Meteor.call("removeArea", this._id);
    }

});

Template.infoArea.helpers({
    isEditPossible: function () {
        var currentArea = Areas.findOne({_id: Session.get("Area")});
        var owner = currentArea.user;
        var isPublic = currentArea.public;
        return owner === Meteor.userId() && !isPublic;
    }
});







