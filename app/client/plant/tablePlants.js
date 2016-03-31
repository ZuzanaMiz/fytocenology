Template.tablePlants.helpers({
    plants: function () {
        var idz = Session.get("report");
        return Plants.find({reportId: idz});
    }
});
  