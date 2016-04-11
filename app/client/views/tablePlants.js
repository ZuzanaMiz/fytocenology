Template.tablePlants.helpers({
    plants: function () {
        var idz = Session.get("report");
        return Plants.find({reportId: idz});
    },
    isClosed: function () {
        return (Reports.findOne(({_id: Session.get('report')})).closed) == 'false';
    },
    existEdit: function () {
        return Session.get('editedPlant') == undefined;
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


  