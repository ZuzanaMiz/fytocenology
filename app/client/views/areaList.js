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
    },
    generatorMode: function () {
        return Session.get("generatorMode") === true;
    },


});

Template.area_list.events({

    'change .onlyMy': function (event) {
        Session.set("onlyMy", event.target.checked);

    },
    'click .createGeneratorMode': function () {
        Session.set("generatorMode", true);
    },
    'click .generate': function () {
        var list = $('.report_for_generate');
        var i;
        var reportList = []; //Selected reports
        for (i = 0; i < list.size(); i++) {
            if (list.get(i).value != "") {
                reportList.push(list.get(i).value); // get ID of selected report
            }
            var plants_from_reports = Plants.find({reportId: {$in: reportList}}); // get all plants
            var plants_names = [];
            //get plant names, without duplicates
            plants_from_reports.forEach(function (plant) {
                if (Session.get(plant.name) != true) {
                    Session.set(plant.name, true);
                    plants_names.push(plant.name);
                }
            });
            plants_names.sort(); //sort names
            var result_definitive = []; // result object, for  plant and their cover in each repot, '.' if plant is not there
            var result_TAB = ""; // String for TAB output - with id of reports
            var result_STR = "1  Table number'\n'" +
                "3 Releve number \n" + //report id 16 char
                "20 Year \n" +
                "25 Month \n" +
                "29 Day \n" +
                "GPS  \n" +
                "Celková pokryvnosť  \n";


            plants_names.forEach(function (plant) {
                var plant_result = []; // all covers for one plant
                Session.set(plant, false); // remove session
                plant_result.push(plant); // add plant name
                reportList.forEach(function (report_id) { //add plant cover for all selected reports
                    result_TAB = result_TAB.concat(report_id.toString(), '\n'); //we can add repot ID to TAB String
                    var act_plant = Plants.findOne({reportId: report_id, name: plant});
                    if (act_plant != undefined && act_plant != null) {
                        plant_result.push(act_plant.degree);
                    } else {
                        plant_result.push(".");
                    }

                });
                result_definitive.push(plant_result);
            });
            var result_TXT = ""; //String file for TXT output, with plants and their cover
            //create String from result
            result_definitive.forEach(function (resPart) {
                var count = 0;
                resPart.forEach(function (res) {
                    result_TXT = result_TXT.concat(res);
                    if (count == 0)
                        result_TXT = result_TXT.concat("      ");
                    count++;
                });
                result_TXT = result_TXT.concat('\n');
            });

            var result_EXP = "";
            var count_tables = 1;
            reportList.forEach(function (report_id) {
                var report_full = Reports.findOne({_id: report_id});
                result_EXP = result_EXP.concat(count_tables.toString(), report_full.date);
                var area = Areas.findOne({_id: report_full.areaId});
                result_EXP = result_EXP.concat(area.gps1, '\n');
                count_tables++;

            });

            console.log(result_TXT);
            console.log(result_TAB);
            output_txt.value = result_TXT;
            output_str.value = result_STR;
            output_tab.value = result_TAB;
            output_exp.value = result_EXP;
            //}
        }
    }


});
Template.area.onCreated(function () {
    if (this.gps1 !== undefined && this.gps1.typeof(Object)) {
        var long = this.gps1.longitude;
        this.gps1 = long;
    }

});
Template.area.helpers({
    "userIsOwner": function () {
        console.log(Areas.findOne({_id: this._id}).user === Meteor.userId());
        return Areas.findOne({_id: this._id}).user === Meteor.userId();
    },
    "saved": function () {
        var exist = SavedAreas.findOne({user: Meteor.userId(), area: this._id});
        if (exist === null || exist === undefined) {
            return false;
        }
        return true;
    },
    'generatorMode': function () {
        return Session.get("generatorMode") === true;
    },
    "reportsForGenerator": function () {
        return Reports.find({areaId: this._id, closed: "true"});
    },
    "user_name": function () {
        if (this.user === Meteor.userId()) {
            return "ja";
        }
        else {
            return this.user;
    }
    }
});
Template.area.events({
    "change .isPublic": function () {
        Meteor.call("updateAreaPublic", this._id, event.target.checked);

    },


    "change .isSaved": function () {
        var save = event.target.checked;
        if (save === true) {
            Meteor.call("insertSavedArea", this._id);
        } else {
            Meteor.call("removeSavedArea", this._id);
        }
    }


});