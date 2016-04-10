Template.tablePlants.helpers({
    plants: function () {
        var idz = Session.get("report");
        return Plants.find({reportId: idz});
    },
    isClosed: function () {

        return (Reports.findOne(({_id: Session.get('report')})).closed) == 'false';
    }
});
Template.plant.events({
    'click .delete': function () {
        Meteor.call("removePlant", this._id);
    },
    'click .editPlant': function () {
        Session.set(this._id, 'is');
    },
    'click .savePlant': function (event, template) {
        var namevalue = "name_" + this._id;


        name = ("name_" + this._id).value;
        console.log(name);
        degree = ("degree").value;
        sociability = ("sociability_" + this._id).value;
        vitality = ("vitality_" + this._id).value;
        Meteor.call("updatePlant", (this._id, name, degree, vitality, sociability));
        Session.set(this._id, null);
    }
});
Template.plant.helpers({
    'isEditable': function () {
        console.log(this._id);
        return Session.get(this._id) === 'is';

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


  