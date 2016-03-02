
Template.degreeTempl.helpers({
	degrees:function() {
	return VegetationZone.find();
}

});
Template.body.helpers({
	reports:function() {
	return Reports.find();
}
});


Template.addReport.events(
	{'submit .new-report':function(event) {
		var stup = event.target.degreeSelect.value;
		var cover= event.target.cover.value;
		var parts = location.href.split('/'); //vezmeme id
		var id = Session.get("Area") // ulozime do premmennej
		Session.set('wantAddArea', "no");
		Meteor.call("insertReport", stup, cover, id);


			 
		event.target.degreeSelect.value="";
		event.target.cover.value="";
		stup="";
		cover="";
		parts="";
		id="";

		return false;

}});

Template.stupneVegetTable.helpers({
	degreeValue:function() {
	return degrees;
}

});




