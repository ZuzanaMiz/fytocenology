Template.login.helpers({
    currentUser: function () {
        return Meteor.userId() == null;
    },
    //userName: function(){
    //	return Meteor.user().profile.name;
//	}

});
