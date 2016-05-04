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

            // Create a marker for this document
            areas.forEach(function (area) {
                var hab = Habitats.findOne({_id: area.habitat});
                switch (hab.name) {

                    case  "vodny":
                        pinColor = "0033FF";
                        break;
                    case "luka":
                        pinColor = "FFFF00";
                        break;
                    case "les":
                        pinColor = "006600"
                        break;

                    default:
                        pinColor = "CF38DA";
                }
                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34));
                var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                    new google.maps.Size(40, 37),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(12, 35));
                var marker = new google.maps.Marker({

                    position: new google.maps.LatLng(area.gps1.latitude, area.gps1.longitude),
                    map: map.instance,
                    icon: pinImage,
                    shadow: pinShadow

                });
            });
        }
    });
});



