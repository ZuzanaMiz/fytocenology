Template.tablePlants.helpers({
    getZobrazenieStupnov: function (zobrazenie_pokryvnosti) {
        return Session.get('zobrazenie_pokryvnosti') == 'VDM';
    },

});
Template.addPlant.helpers({
    isClosed: function (wantAddArea) {

        return (Reports.findOne(({_id: Session.get('report')})).closed) == 'false';
    }
});
Template.addPlant.events({
    'click .takePhoto': function (event, template) {
        var cameraOptions = {
            width: 800,
            height: 600
        };

        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (!error) {
                //template.$('.photo').attr('src', data);
                // Session.set('photo', data);
                Meteor.call("savePhoto", data, Session.get("report"));
            }
        });
        event.preventDefault();
    }
});

Template.tablePlants.events({
    'submit .add-plant': function (event) {
        var name = event.target.name.value;
        var stup = "";

        //  if (Session.get('zobrazenie_pokryvnosti')=='VDM') {
        stup = event.target.degree.value;
        //}
        // else {
        //  stup= event.target..value;
        //      }

        var vital = event.target.vitality.value;
        var sociabil = event.target.sociability.value;
        var id = Session.get("report");

        Meteor.call("insertPlant", name, stup, vital, sociabil, id);

        name = "";
        stup = "";
        vital = "";
        sociabil = "";
        id = "";
        event.target.name.value = "";
        event.target.degree.value = "";
        event.target.vitality.value = "";
        event.target.sociability.value = "";
        event.target.formatPokryvnostiSelect.value = "";

        return false;
    }
});


Template.plant.events({
    'click .delete': function () {
        Meteor.call("removePlant", this._id);
    }
});
