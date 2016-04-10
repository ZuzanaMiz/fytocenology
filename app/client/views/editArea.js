Template.editArea.helpers({
    cardinals: function () {

            return Cardinals.find();


    },
    biotops: function () {

        return Habitats.find();
    },
    setSelects: function () {
        // cardinalSelectEdit.value=Areas.findOne({_id:Session.get("area")}).exposure;
        // habitatSelectEdit.value=Areas.findOne({_id:Session.get("area")}).habitat;
    }
});
Template.editArea.events({

    'submit .edit-area': function (event) {

        var high = event.target.high.value;
        var sur1 = event.target.gps2.value;
        var sur2 = event.target.gps2.value;
        var size = event.target.sizeHabEdit.value;
        var name = event.target.place.value;
        var bio = habitatSelectEdit.value;
        var exp = cardinalSelectEdit.value;
        var desc = event.target.description.value;

        //if (Session.get("gps1") != null) {
        //    gps1 = Session.get("gps1");
        //}
        //if (Session.get("gps2") != null) {
        //    gps2 = Session.get("gps2");
        //}
        Meteor.call("updateArea", this._id, name, desc, sur1, sur2, high, exp, bio, size);
        sur1 = "";
        sur2 = "";
        size = "";
        name = "";
        bio = "";
        exp = "";
        desc = "";


        Session.set("areaViewAndChange", false);

        return false;

    },

});
