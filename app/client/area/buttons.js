Template.changeButton.events({
    'click .addNew': function () {
        Session.set('wantAddReport', "yes");
    }
});

Template.backButton.events({
    'click .addNew': function () {
        Session.set('wantAddReport', "no");
    }
});

Template.finalButton.events({
    "click .closeReport": function () {
        Meteor.call("updateFinalReport", Session.get("report"), "true");
    }
});