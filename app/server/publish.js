
//moje plus verejne 
Meteor.publish('areas', function() {
	return Areas.find();

});

Meteor.publish('biotops', function(){
	return Biotops.find();
});

Meteor.publish('strany', function(){
	return Cardinals.find();
});

//len moje + verejne
Meteor.publish('zaznamy', function(){
	return Reports.find();
});

Meteor.publish('plants', function(){
	return Plants.find();
});

Meteor.publish('vegetacneStupne', function(){
	return VegetationZone.find();
});

 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});

