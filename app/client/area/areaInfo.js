Template.reportList.helpers({
	reportId:function() {
		
		var parts = location.href.split('/');
		var id = parts.pop();
		return Reports.find({areaId: id});
}

});