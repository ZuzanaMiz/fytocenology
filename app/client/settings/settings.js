Template.setSettings.events({
    'submit .settings_form': function (event) {
        var degrees = event.target.formatExpozicieSelect.value;
        var showCover = event.target.formatPokryvnostiSelect.value;
        Session.set('zobrazenie_pokryvnosti', pokryvnostVar);
        Session.set('zobrazenie_stran', strany);

        Meteor.call("updateUserSettings", Meteor.userId(), showCover, degrees);
        Session.set("settings_view", "info");
        return false;
    },

    'reset .settings_form': function (event) {


    }
});
Template.actualSettings.events({
    'click .wantChangeSettings': function (event) {
        Session.set("settings_view", "change");
    }
});
Template.settings.helpers({
    'settings_view_is_change': function () {
        return Session.get("settings_view") == "change";

    },
});
//not work
Template.actualSettings.helpers({
    "cardinalsCount": function () {
        console.log(UserSettings.find({user: Meteor.userId()}));
        var userSettings = UserSettings.findOne({user: "default"});
        return userSettings.cover;
    },
    'coverType': function () {
        var userSettings = UserSettings.findOne({user: Meteor.userId()});
        return userSettings.cover;
    }

});

