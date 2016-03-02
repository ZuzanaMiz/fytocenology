
  

  Template.addPlant.helpers({
      getZobrazenieStupnov :function(zobrazenie_pokryvnosti){
        return Session.get('zobrazenie_pokryvnosti')=='VDM';
    },
      isClosed: function(wantAddArea){

            return (Reports.findOne(({ _id: Session.get('report')})).closed)=='false';
        }
});


Template.addPlant.events({
  'submit .new-plant': function(event){
      var name =  event.target.name.value;
      var stup = "";
      
      if (Session.get('zobrazenie_pokryvnosti')=='VDM') { 
        stup = event.target.degree.value;}
      else {
        stup= event.target.BBcoverSelect.value;
      }

      var vital =event.target.vitality.value;
      var sociabil= event.target.sociability.value;
      var id = Session.get("report");
     
      Meteor.call("insertPlant", name, stup, vital, sociabil, id);
    
      name="";
      stup="";
      vital="";
      sociabil ="";
      id="";
      event.target.name.value="";
      event.target.degree.value="";
      event.target.vitality.value="";
      event.target.sociability.value="";
      event.target.formatPokryvnostiSelect.value="";

      return false; 
     }
  });
    

   Template.plant.events({
    'click. delete':function() {
      Meteor.call("removePlant", this._id);
    } 
  });
