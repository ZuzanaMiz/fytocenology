Session.setDefault('wantAddArea', 'no');

Template.editArea.helpers({
    wantAdd: function (wantAddArea) {
        console.log(Session.get('wantAddArea'));

        return Session.get('wantAddArea') == "no";
    }
});

Template.changeButton.events({
    'click .addNew': function (event) {
        Session.set('wantAddArea', "yes");
        console.log(Session.get('wantAddArea'));

    }
});