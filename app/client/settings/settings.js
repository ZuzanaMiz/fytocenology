//Session.setDefault('zobrazenie_stran', '8');
//Session.setDefault('zobrazenie_pokryvnosti', 'BB');


Template.settings.events({'submit .settings_form':function(event) {


var strany = event.target.formatExpozicieSelect.value;
var pokryvnostVar= event.target.formatPokryvnostiSelect.value;


 Session.set('zobrazenie_pokryvnosti', pokryvnostVar);

 Session.set('zobrazenie_stran', strany);

 //UserSettings.update({'user': Meteor.userId(), 'zobrazenie_stran':strany, 'zobrazenie_pokryvnosti' :pokryvnostVar});
 console.log(Session.get('zobrazenie_stran'));

	 	return false; 
 	 }

});