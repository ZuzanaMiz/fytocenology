/* GPS = new SimpleSchema({

 latitude: {type:String},
 longitude: {type:String},
 altitude:{type:String},
 accuracy:{type:String},
 altitudeAccuracy:{type:String},
 heading: {type:String},
 speed: {type:String}});

 Report = new SimpleSchema({
 cover: {type:Number},
 date: {type:Date},
 areaId:{type:String},
 closed: {type:Boolean},
 userId: {type:String}
 });
 Plant = new SimpleSchema({
 name: {type:String},
 degree: {type:Number},
 vitality:{type:String},
 sociability: {type:Number},
 reportId: {type:String},
 vegetationDegree:{type:String}
 });
 area = new SimpleSchema({
 place: {type: String},
 description: {type: String},
 gps1:{Object},
 gps2:{Object},
 high: {type: Number},
 exposure: {type: String},
 habitat: {type: String},
 size: {type: Number},
 user: {type:id}});
 */
Meteor.methods({
    'insertArea' (place, description, gps1, gps2, high, exposure, habitat, size){
        // area.validate({place, description,  high, exposure, habitat, size});
        Areas.insert({
            place: place,
            description: description,
            gps1: gps1,
            gps2: gps2,
            high: high,
            exposure: exposure,
            habitat: habitat,
            user: Meteor.userId(),
            size: size
        });
    },


    /*insertArea: function (place, description, gps1, gps2, high, exposure, habitat, size) {
        /*    validate: new SimpleSchema({
                place: {type: String},
                description: {type: String},
                gps1: {type: Array},
                gps2: {type: Array},
                high: {type: Number},
                exposure: {type: String},
                habitat: {type: String},
                size: {type: Number},
            }
     ).validator(),
        Areas.insert({
            place: place,
            description: description,
            gps1: gps1,
            gps2: gps2,
            high: high,
            exposure: exposure,
            habitat: habitat,
            user: Meteor.userId(),
            size: size
        });
    },
     */

    updateArea: function (id, name, desc, gps1, gps2, altitude, exp, bio, size) {

        Areas.update({
            _id: id
        }, {
            $set: {
                place: name,
                description: desc,
                gps1: gps1,
                gps2: gps2,
                high: altitude,
                exposure: exp,
                habitat: bio,
                size: size
            }
        });
    },

    removeArea: function (id) {
        Areas.remove({_id: id});

        //cascade we have to remove reports and plants
        var reports = Reports.find({areaId: id});
        reports.forEach(function (report) {
            Meteor.call("removeReport", report._id);
        });
    },

    removeReport: function (id) {
        Plants.remove({reportId: id});
        Photos.remove({idReport: id});
        Reports.remove({_id: id});
    },

    insertPlant: function (name, degree, vital, sociability, id) {

        Plants.insert({
            name: name,
            degree: degree,
            vitality: vital,
            sociability: sociability,
            reportId: id
        });
    },
    updatePlant: function (plantId, name, degree, vital, sociability) {

        Plants.update({_id: plantId}, {$set: {name: name, degree: degree, vitality: vital, sociability: sociability}});

    },

    removePlant: function (id) {

    },
    insertReport: function (cover, areaId, date) {
        var closed = false;
        var userId = Meteor.userId();

        Reports.insert({

            cover: cover,
            date: date,
            areaId: areaId,
            closed: closed,
            userId: userId

        });
    },

    insertCardinals: function (degrees, name, basic) {
        Cardinals.insert({
            degree: degrees,
            name: name,
            basic: basic

        });
    },

    insertHabitat: function (name, size) {
        Habitats.insert({
            name: name,
            size: size,
            user: Meteor.userId(),

        });

    },
    insertHabitatWithUID: function (name, size, user) {
        Habitats.insert({
            name: name,
            size: size,
            user: user,

        });

    },
    updateHabitat: function (name, size) {
        Habitats.update({name: name, user: Meteor.userId()}, {$set: {size: size}});

    },

    updateFinalReport: function (report, final) {
        Reports.update({_id: report}, {$set: {closed: final}});

    },
    updateReportCover: function (report, cover) {
        Reports.update({_id: report}, {$set: {cover: cover}});
    },

    savePhoto: function (photo, idReport, idArea) {

        Photos.insert({
            photo: photo,
            idReport: idReport,
            idArea: idArea,
        });
    },


    insertUserSettings: function (showCover, degrees) {
        UserSettings.insert({user: Meteor.userId(), cover: showCover, degrees: degrees});

    },
    updateUserSettings: function (showCover, degrees) {
        UserSettings.update({user: Meteor.userId()}, {$set: {cover: showCover, degrees: degrees}});
    },
    updateAreaPublic: function (id, isPublic) {
        Areas.update({_id: id}, {$set: {public: isPublic}});
    },
    insertSavedArea: function (idArea) {
        SavedAreas.insert({user: Meteor.userId(), area: idArea});
    },
    removeSavedArea: function (idArea) {
        SavedAreas.remove({user: Meteor.userId(), area: idArea});
    },

    removePhoto: function (id) {
        Photos.remove({_id: id});
    },
    getExposition: function (degrees) {
        return Cardinals.findOne({degree: degrees}).name;
    }
});