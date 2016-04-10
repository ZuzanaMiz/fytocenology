Template.setSettings.events({
    'submit .settings_form': function (event, template) {

        var degrees = formatExpozicieSelect.value;
        var showCover = formatPokryvnostiSelect.value;
        var actualSettings = UserSettings.findOne({user: Meteor.userId()});
        var rows = settingsTable.rows;
        console.log(rows);
        var i, j, cells, habitat, value;

        for (i = 0, j = rows.length; i < j; ++i) {
            cells = rows[i].getElementsByTagName('td');
            if (!cells.length) {
                continue;
            }
            habitat = cells[0];
            console.log(habitat);
            value = cells[1];


            var actHabit = Habitats.findOne({user: Meteor.userId(), name: habitat});
            if (actHabit === null || actHabit === undefined) {
                Meteor.call("insertHabitat", habitat, value, Meteor.userId());
            } else {
                Meteor.call("updateHabitat", habitat, value, Meteor.userId());
            }
        }
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
        return Habitats.find();
    },
    'settings_view_is_change': function () {
        return Session.get("settings_view") == "change";

    }

});


