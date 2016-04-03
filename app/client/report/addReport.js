Template.addReport.events({
    'submit .new-report': function (event) {
        var cover = event.target.cover.value;
        var idArea = Session.get("Area");
        Session.set('wantAddReport', "no");
        Meteor.call("insertReport", cover, idArea, Meteor.userId(), new Date());
        event.target.cover.value = "";
        return false;
    }

});






