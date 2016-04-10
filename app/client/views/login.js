Template.login.helpers({
    currentUser: function () {
        return Meteor.userId() == null;
    },
    areasCount: function () {
        return Areas.find({user: Meteor.userId()}).count();

    },
    reportsCount: function () {
        return Reports.find({user: Meteor.userId()}).count();
    },
    allAreasCount: function () {
        return Areas.find().count();

    },
    savedAreasCount: function () {
        return SavedAreas.find({user: Meteor.userId()}).count();
    }

});
