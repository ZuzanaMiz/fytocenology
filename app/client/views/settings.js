Template.setSettings.events({
    'click .settings_save': function (event, template) {

        var degrees = formatExpozicieSelect.value;
        var showCover = formatPokryvnostiSelect.value;
        var actualSettings = UserSettings.findOne({user: Meteor.userId()});
        var rows = $('#habitat_table').find('tr:not(:hidden)');
        console.log($(rows.get(1)).find('td'));


        var i;
        for (i = 1; i < rows.size(); i++) {
            var cells = $(rows.get(i)).find('td');
            var habitat = $(cells.get(0)).text();
            var number = $(cells.get(1)).text();
            console.log(habitat);
            console.log(cells);
            var actHabit = Habitats.findOne({user: Meteor.userId(), name: habitat});

            if (actHabit === null || actHabit === undefined) {
                Meteor.call("insertHabitat", habitat, number);
            } else {
                Meteor.call("updateHabitat", habitat, number);
            }
        }
        if (actualSettings === null || actualSettings === undefined) {

            Meteor.call("insertUserSettings", showCover, degrees);
        } else {
            Meteor.call("updateUserSettings", showCover, degrees);
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
        return Session.get("settings_view") === "change";
    },
});

Template.actualSettings.helpers({
    "cardinalsCount": function () {
        var userSettings = UserSettings.findOne({user: Meteor.userId()});
        if (userSettings === null || userSettings === undefined) {
            return UserSettings.findOne({user: "default"}).degrees;
        }
        else {
            return userSettings.degrees;
        }
    },
    'coverType': function () {
        var userSettings = UserSettings.findOne({user: Meteor.userId()});
        if (userSettings === null || userSettings === undefined) {
            return UserSettings.findOne({user: "default"}).cover;
        }
        else {
            return userSettings.cover;
        }
    }
});
Template.habitats.helpers({
    'habitats': function () {
        if (Habitats.find({user: Meteor.userId()}).count() > 0) {
            return Habitats.find({user: Meteor.userId()});
        } else {
            return Habitats.find({user: "default"});
        }
    },
    'settings_view_is_change': function () {
        return Session.get("settings_view") == "change";

    }

});

