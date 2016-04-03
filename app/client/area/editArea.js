Template.editArea.helpers({
    cardinals: function () {
        if (Session.get('zobrazenie_stran') == "8") {
            return Cardinals.find();
        } else {
            return Cardinals.find({basic: true});
        }

    },
    biotops: function () {

        return Biotops.find();
    },
    setSelects: function () {
        // cardinalSelectEdit.value=Areas.findOne({_id:Session.get("area")}).exposure;
        // habitatSelectEdit.value=Areas.findOne({_id:Session.get("area")}).habitat;
    }
});
Template.editArea.events({

    'submit .edit-area': function (event, template) {
        console.log("editujem");
        var bio = habitatSelectEdit.value;
        var exp = cardinalSelectEdit.value;
        var altitude = event.target.highEdit.value;
        var sur1 = event.target.gps2edit.value;
        var sur2 = event.target.gps2Edit.value;
        var size = event.target.sizeHabEdit.value;
        var name = event.target.placeEdit.value;

        var desc = event.target.descriptionEdit.value;

        //if (Session.get("gps1") != null) {
        //    gps1 = Session.get("gps1");
        //}
        //if (Session.get("gps2") != null) {
        //    gps2 = Session.get("gps2");
        //}
        Meteor.call("updateArea", id, name, desc, sur1, sur2, altitude, exp, bio, size);
        event.target.descriptiEditon.value = "";
        event.target.highEdit.value = "";
        event.target.gps1Edit.value = "";
        event.target.gps2Edit.value = "";
        event.target.sizeHabEdit.value = "";
        event.target.placeEdit.value = "";


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

});
