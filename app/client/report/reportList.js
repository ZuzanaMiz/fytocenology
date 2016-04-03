Template.reportList.helpers({
    reportId: function () {
        return Reports.find({areaId: Session.get("Area")});
    }
});