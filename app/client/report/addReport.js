Template.degreeTempl.helpers({
    degrees: function () {
        return VegetationZone.find();
    }

});
Template.body.helpers({
    reports: function () {
        return Reports.find();
    }
});


Template.addReport.events({
    'submit .new-report': function (event) {
        var cover = event.target.cover.value;
        var idArea = Session.get("Area"); // ulozime do premmennej
        console.log("c" + cover);
        Session.set('wantAddArea', "no");

        Meteor.call("insertReport", cover, idArea, Meteor.userId(), new Date());

        //event.target.degreeSelect.value = "";
        event.target.cover.value = "";


        return false;

    }


});

Template.stupneVegetTable.helpers({
    degreeValue: function () {
        return degrees;
    }

});




