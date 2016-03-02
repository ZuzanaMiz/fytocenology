Meteor.methods({

	insertArea: function(naz, pop, sur1,sur2, high, exp, bio, user, photo, size)	{

		Areas.insert({ 
		  place:    naz,
		  description:    pop,
		  gps1:sur1,
		  gps2:sur2,
		  high:    high,
		  exposure:exp,
		  habitat:   bio,
		  user : user,
		  photo: photo,
			size: size
		}); 
	}, 
	insertPlant: function(name, degree, vital, sociability, id) {
		Plants.insert({ 
		  name: name,
		  degree:degree,
		  vitality:vital,
		  sociability:sociability,
		  reportId: id
		  }); 
	},

	removePlant:function(id) {

	},
	insertReport: function(degree, cover, id) {

		Reports.insert({

		vegetationDegree: degree,
		cover: cover,
		date: new Date(),
		areaId: id,
		closed:'false'
	
		});
	}, 
	updateFinalReport: function(report, final){
		      Reports.update({_id :report},{$set:{closed : final}});

	}
	

});



