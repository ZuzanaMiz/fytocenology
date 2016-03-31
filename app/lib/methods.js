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
	insertPlant: function (name, degree, vital, sociability, id) {
		Plants.insert({
			name: name,
			degree: degree,
			vitality: vital,
			sociability: sociability,
			reportId: id
		});
	},

	removePlant: function (id) {

	},
	insertReport: function (cover, areaId, photo, idUser, date) {

		Reports.insert({

			cover: cover,
			date: date,
			areaId: areaId,
			photo: photo,
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
		Biotops.insert({
			name: name,
			size: size,
			user: user,

		});
	},

	updateFinalReport: function (report, final) {
		Reports.update({_id: report}, {$set: {closed: final}});

	},

	savePhoto: function (photo, idReport) {

		Photos.insert({
			photo: photo,
			idReport: idReport
		});
	},

	removePhoto: function (id) {
		Photos.removePhoto({_id: id});
	},

	insertUserSettings: function (user, showCover, degrees) {
		UserSettings.insert({user: Meteor.userId(), cover: showCover, degrees: degrees});

	},
	updateUserSettings: function (user, showCover, degrees) {
		UserSettings.update({user: Meteor.userId(), cover: showCover, degrees: degrees});
	}
});