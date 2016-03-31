Template.changeButton.events({
    'click .addNew': function (event) {
        Session.set('wantAddArea', "yes");
    }
});

Template.backButton.events({
    'click .addNew': function (event) {
        Session.set('wantAddArea', "no");
    }
});

Template.finalButton.events({
    'click .closeZaznam': function (event) {
        Meteor.call("updateFinalReport", Session.get("report"), "true");
    }
});