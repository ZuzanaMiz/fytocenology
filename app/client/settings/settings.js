Template.setSettings.events({
    'submit .settings_form': function (event) {

        var degrees = formatExpozicieSelect.value;
        var showCover = formatPokryvnostiSelect.value;
        var actualSettings = UserSettings.findOne({user: Meteor.userId()});

        if (actualSettings === null || actualSettings === undefined) {

            Meteor.call("insertUserSettings", Meteor.userId(), showCover, degrees);
        } else {
            Meteor.call("updateUserSettings", Meteor.userId(), showCover, degrees);
        }

        Session.set("settings_view", "info");
        return false;
    },
    "click .defaultValues": function () {
        var defaultSettings = UserSettings.findOne({user: "default"});
        formatExpozicieSelect.value = defaultSettings.degrees;
        formatPokryvnostiSelect.value = defaultSettings.cover;

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
        var userSettings = UserSettings.findOne({user: Meteor.userId()});
        return userSettings.degrees;
    },
    'coverType': function () {
        var userSettings = UserSettings.findOne({user: Meteor.userId()});
        return userSettings.cover;
    }

});

