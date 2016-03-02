Template.body.helpers({
    areas:function(){
     
      return Areas.find();}
    });

Template.cardinalTemplate.helpers({
    cardinals:function(){
      
      if (Session.get('zobrazenie_stran')=="8") {
              return Cardinals.find();
      } else { 
              return Cardinals.find({zakladna: "YES"}); }
  
    }

});

Template.addArea.events({
  'submit .new-area': function(event){
      var altitude = event.target.high.value;
      var sur1 = event.target.gps1.value;
      var sur2 = event.target.gps2.value;
      var size = event.target.size.value;
      var bio = event.target.habitatSelect.value;
      var exp = event.target.cardinalSelect.value;
      var desc= event.target.description.value;
      var name = event.target.place.value;
      var user = Meteor.userId();

      Meteor.call("insertArea", name, desc, sur1,sur2, altitude, exp, bio, user, Session.get('photo'), size);
      event.target.description.value="";
      event.target.high.value="";
      event.target.gps1.value="";
      event.target.gps2.value="";
        event.target.size.value ="";
      event.target.description.value="";
      event.target.place.value="";
      


      sur1 = "";
      sur2="";
      desc= "";
      altitude ="";
      bio = "";
      exp="";
      name= "";
      size="";
      return false; 
 
    }, 

    'click .takePhoto': function(event, template) {
        var cameraOptions = {
            width: 800,
            height: 600
        };


     MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               template.$('.photo').attr('src', data); 
               Session.set('photo', data);
           }
        });
        event.preventDefault();
    },
    'change #habitatSelect': function(event, template) {
       var bio = habitatSelect.value;

//TODO - bad .. :D
        var popd = bio.split('"');
        var oid = new Mongo.ObjectID(popd[1]);
        var doc = Biotops.findOne(oid);
        var rozmerBiotopu = doc.size;
        size.value = rozmerBiotopu;
    },
    'click .GPS1':function(event, template) {
      var position = Geolocation.currentLocation();
      suradnica1.value = position.coords.latitude;
      size.value = position.altitude;

    },

    'click .GPS2':function(event, template){
      var position2 = Geolocation.currentLocation();
      gps2.value = position2.coords.longitude;
      size.value = position.altitude;


    }

 });
