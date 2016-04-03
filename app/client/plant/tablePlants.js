Template.tablePlants.helpers({
    plants: function () {
        var idz = Session.get("report");
        return Plants.find({reportId: idz});
    },
    isClosed: function () {

        return (Reports.findOne(({_id: Session.get('report')})).closed) == 'false';
    }
});


  