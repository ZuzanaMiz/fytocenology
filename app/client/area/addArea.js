Template.body.helpers({
    areas: function () {

        return Areas.find();
    },

});


Template.addArea.helpers({
    cardinals: function () {
        if (Session.get('zobrazenie_stran') == "8") {
            return Cardinals.find();
        } else {
            return Cardinals.find({basic: true});
        }

    },
    biotops: function () {
        return Biotops.find();
    }

});

Template.addArea.events({
    "submit .new-area": function (event) {

        var altitude = event.target.high.value;
        var sur1 = event.target.gps1.value;
        var sur2 = event.target.gps2.value;
        var size = event.target.sizeHab.value;
        var name = event.target.place.value;
        var user = Meteor.userId();
        var bio = habitatSelect.value;
        var exp = cardinalSelect.value;
        var desc = event.target.description.value;

        console.log("adding area");
        if (Session.get("gps1") != null) {
            gps1 = Session.get("gps1");
        }
        if (Session.get("gps2") != null) {
            gps2 = Session.get("gps2");
        }
        Meteor.call("insertArea", name, desc, sur1, sur2, altitude, exp, bio, user, size);
        event.target.description.value = "";
        event.target.high.value = "";
        event.target.gps1.value = "";
        event.target.gps2.value = "";
        event.target.sizeHab.value = "";
        event.target.place.value = "";


        sur1 = "";
        sur2 = "";
        desc = "";
        altitude = "";
        bio = "";
        exp = "";
        name = "";
        sizeHab = "";
        return false;

    },


    'change #habitatSelect': function (event, template) {
        var bio = habitatSelect.value;
        if (bio == "") {
            sizeHab.value = "";
        } else {
            var doc = Biotops.findOne(bio);
            var rozmerBiotopu = doc.size;
            sizeHab.value = rozmerBiotopu;
        }
    },
    'click .GPS1': function (event, template) {
        var position = Geolocation.currentLocation();
        var value = "v:" + position.coords.latitude + " s:" + position.coords.longitude;
        gps1.value = value;
        high.value = position.altitude;
        Session.set("gps1", position);

    },

    'click .GPS2': function (event, template) {
        var position2 = Geolocation.currentLocation();
        var value = "v:" + position2.coords.latitude + " s:" + position2.coords.longitude;
        Session.set("gps2", position2);

        gps2.value = value;
        high.value = position2.coords.altitude;


    }

});
