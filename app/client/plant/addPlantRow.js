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
