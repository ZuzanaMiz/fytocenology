Template.editReport.helpers({
    isClosed: function () {

        return (Reports.findOne(({_id: Session.get('report')})).closed) == 'false';
    },
    wantEditReport: function (wantEditReport) {
        return Session.get("wantEditReport") === true;
    },
    dontWantEditReport: function () {
        return Session.get("wantEditReport") !== true || Session.get("wantEditReport") === null;
    },
    canEdit: function () {
        var report = Reports.findOne({_id: this._id});
        return (report.userId === Meteor.userId() && report.closed === false)
            && (Session.get("wantEditReport") === null || Session.get("wantEditReport") !== true);
    }
});

Template.editReport.events({
    'click .takePhoto': function (event) {
        var cameraOptions = {
            width: 800,
            height: 600
        };

        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (!error) {
                Meteor.call("savePhoto", data, Session.get("report"));
            }
        });
        event.preventDefault();
    },
    'click .editReport': function () {
        Session.set("wantEditReport", true);

    },
    'submit .edit-report': function (event) {
        var cover = event.target.cover.value;
        Meteor.call("updateReportCover", this._id, cover);
        event.target.cover.value = "";
        Session.set("wantEditReport", false);
        return false;

    }

});




