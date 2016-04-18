Template.login.helpers({
    currentUser: function () {
        return Meteor.userId() == null;
    },
    areasCount: function () {
        return Areas.find({user: Meteor.userId()}).count();

    },
    reportsCount: function () {
        return Reports.find({userId: Meteor.userId()}).count();
    },
    allAreasCount: function () {
        return Areas.find().count();

    },
    savedAreasCount: function () {
        return SavedAreas.find({user: Meteor.userId()}).count();
    },
    mapOptions: function () {

        return {
            center: new google.maps.LatLng(48, 22),
            zoom: 5
        };
    }

});

Template.login.onCreated(function () {
    //TODO if - color and link na info o oblasti

    GoogleMaps.ready('map', function (map) {
        {
            var areas = Areas.find({user: Meteor.userId()});
            var pinColor = "CF38DA";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));
            var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));
            // Create a marker for this document
            areas.forEach(function (area) {
                var marker = new google.maps.Marker({

                    position: new google.maps.LatLng(area.gps1[0], area.gps1[1]),
                    map: map.instance,
                    icon: pinImage,
                    shadow: pinShadow

                });
            });
        }
    });
});



