Template.area_list.helpers({
    areas: function () {

        if (Session.get('onlyMy') == true) {

            return Areas.find({user: Meteor.userId()});
        }
        else {
            return Areas.find();
        }

    },
    onlyMyActual: function () {
        return Session.get('onlyMy');
    }

});

Template.area_list.events({

    'change .onlyMy': function (event) {
        Session.set("onlyMy", event.target.checked);

    },


});


//Users.findAll({"nazov" : {$regex : ".*son.*"}});
 