Meteor.publish('areas', function areasPublication() {
    return Areas.find({
        $or: [
            {public: true},
            {user: this.userId},
        ],
    });

});


Meteor.publish('habitats', function () {
    return Habitats.find(
        //{
        //  $or: [
        //    {user: "default"},
        //  {user: this.userId},
        // ],
        //}
    );
});
//in public and my areas
Meteor.publish('photos', function () {
    return Photos.find();
});
//my and default
Meteor.publish('userSettings', function () {
    return UserSettings.find();
});
//all
Meteor.publish('cardinals', function () {
	return Cardinals.find();
});

//only my and public
Meteor.publish('reports', function () {
    return Reports.find({
        $or: [
            {closed: true},
            {userId: this.userId},
        ],
    });
});
//in my and default reports
Meteor.publish('plants', function(){

	return Plants.find();
});
Meteor.publish('users', function () {
    return Users.find();
})


Meteor.publish('vegetacneStupne', function(){
	return VegetationZone.find();
});

Meteor.publish('savedAreas', function () {
    return SavedAreas.find({user: this.userId});
});

 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});

