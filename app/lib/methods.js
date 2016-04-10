Meteor.methods({

    insertArea: function (naz, pop, sur1, sur2, high, exp, bio, user, size) {

        Areas.insert({
            place: naz,
            description: pop,
            gps1: sur1,
            gps2: sur2,
            high: high,
            exposure: exp,
            habitat: bio,
            user: user,
            size: size
        });
    },

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
//remove area
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
    insertReport: function (cover, areaId, idUser, date) {

        Reports.insert({

            cover: cover,
            date: date,
            areaId: areaId,
            closed: 'false',
            userId: idUser

        });
    },

    insertCardinals: function (degrees, name, basic) {
        Cardinals.insert({
            degree: degrees,
            name: name,
            basic: basic

        });
    },

    insertHabitat: function (name, size, user) {
        Habitats.insert({
            name: name,
            size: size,
            user: user,

        });

    },
    updateHabitat: function (name, size, user) {
        Habitats.update({name: name, user: user}, {$set: {size: size}});

    },

    updateFinalReport: function (report, final) {
        Reports.update({_id: report}, {$set: {closed: final}});

    },
    updateReportCover: function (report, cover) {
        Reports.update({_id: report}, {$set: {cover: cover}});
    },

    savePhoto: function (photo, idReport) {

        Photos.insert({
            photo: photo,
            idReport: idReport
        });
    },


    insertUserSettings: function (user, showCover, degrees) {
        UserSettings.insert({user: Meteor.userId(), cover: showCover, degrees: degrees});

    },
    updateUserSettings: function (user, showCover, degrees) {
        UserSettings.update({user: Meteor.userId()}, {$set: {cover: showCover, degrees: degrees}});
    },
    updateAreaPublic: function (id, isPublic) {
        Areas.update({_id: id}, {$set: {public: isPublic}});
    },
    insertSavedArea: function (idUser, idArea) {
        SavedAreas.insert({user: idUser, area: idArea});
    },
    removeSavedArea: function (idUser, idArea) {
        SavedAreas.remove({user: idUser, area: idArea});
    },

    removePhoto: function (id) {
        Photos.remove({_id: id});
    },
    getExposition: function (degrees) {
        console.log("parsing");
        return Cardinals.findOne({degree: degrees}).name;
    }
});