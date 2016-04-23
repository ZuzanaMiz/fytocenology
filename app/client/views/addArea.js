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
        return Habitats.find();
    }

});

Template.addArea.events({
    "submit .new-area": function (event) {

        var altitude = event.target.high.value;
        var sur1 = event.target.gps1.value;
        var sur2 = event.target.gps2.value;
        var size = event.target.sizeHab.value;
        var name = event.target.place.value;
        var bio = habitatSelect.value;
        var exp = cardinalSelect.value;
        var desc = event.target.description.value;

        if (Session.get("gps1") !== null || Session.get("gps1") !== undefined) {
            sur1 = Session.get("gps1");
        }
        if (Session.get("gps2") !== null || Session.get("gps1") !== undefined) {
            sur2 = Session.get("gps2");
        }
        Meteor.call("insertArea", name, desc, sur1, sur2, altitude, exp, bio, size);
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
            var doc = Habitats.findOne(bio);
            var rozmerBiotopu = doc.size;
            sizeHab.value = rozmerBiotopu;
        }
    },
    'click .GPS1': function (event, template) {
        var position = Geolocation.currentLocation();//
        var value = "v:" + position.coords.latitude + " s:" + position.coords.longitude;
        gps1.value = value;
        high.value = position.coords.altitude;
        Session.set("gps1", [position.coords.latitude, position.coords.longitude]);

    },

    'click .GPS2': function (event, template) {
        var position2 = Geolocation.currentLocation();
        var value = "v:" + position2.coords.latitude + " s:" + position2.coords.longitude;
        Session.set("gps2", jQuery.extend(true, {}, position2.coords));
// [position2.coords.latitude, position2.coords.longitude]);

        gps2.value = value;
        high.value = position2.coords.altitude;


    }

});

var MAP_ZOOM = 15;

Meteor.startup(function () {
    GoogleMaps.load();
});

Template.map.helpers({
    geolocationError: function () {
        var error = Geolocation.error();
        return error && error.message;
    },
    mapOptions: function () {
        var latLng = Geolocation.latLng();
        // Initialize the map once we have the latLng.
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM
            };
        }
    }
});

Template.map.onCreated(function () {
    var self = this;

    GoogleMaps.ready('map', function (map) {
        var marker;

        // Create and move the marker when latLng changes.
        self.autorun(function () {
            var latLng = Geolocation.latLng();
            if (!latLng)
                return;

            // If the marker doesn't yet exist, create it.
            if (!marker) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latLng.lat, latLng.lng),
                    map: map.instance,
                });
                gps1.value = latLng.lat;

            }
            // The marker already exists, so we'll just change its position.
            else {
                marker.setPosition(latLng);
            }

            // Center and zoom the map view onto the current position.
            map.instance.setCenter(marker.getPosition());
            map.instance.setZoom(MAP_ZOOM);
        });
    });

});
