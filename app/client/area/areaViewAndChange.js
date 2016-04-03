Session.setDefault("areaViewAndChange", false);
//Session.setDefault("wantAdd", "no");


Template.areaViewAndChange.helpers({
    wantAdd: function (wantAddArea) {

        return Session.get('wantAddReport') == "yes";
    },
    areaViewAndChange: function (areaViewAndChange) {
        return Session.get('areaViewAndChange') === true;
    }
});

Template.changeButton.events({
    'click .addNew': function (event) {
        Session.set('wantAddArea', "yes");

    },

});