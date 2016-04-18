Session.setDefault("areaViewAndChange", false);


Template.areaViewAndChange.helpers({
    wantAdd: function () {

        return Session.get('wantAddReport') == "yes";
    },
    areaViewAndChange: function (areaViewAndChange) {
        return Session.get('areaViewAndChange') === true;
    }
});

Template.changeButton.events({
    'click .addNew': function () {
        Session.set('wantAddArea', "yes");

    },

});

Template.reportList.helpers({
    reportId: function () {
        return Reports.find({areaId: Session.get("Area")});
    }
});

Template.addReport.events({
    'submit .new-report': function (event) {
        var cover = event.target.cover.value;
        var idArea = Session.get("Area");
        Session.set('wantAddReport', "no");
        Meteor.call("insertReport", cover, idArea, new Date());
        event.target.cover.value = "";
        return false;
    }

});

Template.changeButton.events({
    'click .addNew': function () {
        Session.set('wantAddReport', "yes");
    }
});

Template.backButton.events({
    'click .addNew': function () {
        Session.set('wantAddReport', "no");
    }
});

Template.finalButton.events({
    "click .closeReport": function () {
        Meteor.call("updateFinalReport", Session.get("report"), "true");
    }
});
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