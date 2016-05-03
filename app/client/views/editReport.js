Template.editReport.helpers({
    isClosed: function () {

        return (Reports.findOne(({_id: Session.get('report')})).closed) === false;
    },
    wantEditReport: function (wantEditReport) {
        return Session.get("wantEditReport") === true;
    },
    dontWantEditReport: function () {
        return Session.get("wantEditReport") !== true || Session.get("wantEditReport") === null;
    },
    canEdit: function () {
        var report = Reports.findOne({_id: this._id});
        return (report.userId == Meteor.userId() && report.closed == false)
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
                Meteor.call("savePhoto", data, Session.get("report"), Session.get("Area"));
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

Template.tablePlants.helpers({
    plants: function () {
        var idz = Session.get("report");
        return Plants.find({reportId: idz});
    },
    isClosed: function () {
        return (Reports.findOne(({_id: Session.get('report')})).closed) === false;
    },
    existEdit: function () {
        if (Session.get('editedPlant') === undefined || Session.get('editedPlant') === null) {
            console.log(Session.get('editedPlant'));
            return false;
        }
        ;
        return true;
    },
});
Template.plant.events({

    'click .delete': function () {
        Meteor.call("removePlant", this._id);
    },
    'click .editPlant': function () {
        if (Session.get('editedPlant') === null || Session.get('editedPlant') === undefined) {
            Session.setPersistent('editedPlant', this._id);
        }
    },
    'click .savePlant': function (event, template) {


        var name = name_edit.value;
        console.log(name);
        var degree = degree_edit.value;
        var sociability = sociability_edit.value;
        var vitality = vitality_edit.value;
        Meteor.call("updatePlant", this._id, name, degree, vitality, sociability);
        Session.clear('editedPlant');
    }
});
Template.plant.helpers({
    'isEditable': function () {
        return Session.get('editedPlant') === this._id;

    },
    'getCoverType': function () {
        return UserSettings.find({'user': Meteor.userId()}) === 'Van Der Marel';
    }
});
Template.tablePlants.events({
    'submit .add-plant': function (event) {
        var name = event.target.name.value;
        var degree = event.target.degree.value;
        var vital = event.target.vitality.value;
        var sociability = event.target.sociability.value;
        var id = Session.get("report");

        Meteor.call("insertPlant", name, degree, vital, sociability, id);

        event.target.name.value = "";
        event.target.degree.value = "";
        event.target.vitality.value = "";
        event.target.sociability.value = "";

        return false;
    }
});

Template.addPlantRow.helpers({
    getCoverType: function () {
        return UserSettings.find({user: Meteor.userId()}).degrees == 'Van der Maarel';
    },

});





