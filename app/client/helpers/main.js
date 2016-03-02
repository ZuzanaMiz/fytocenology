Template.registerHelper('getOnlineStatus', function(){
  if(Meteor.status().status === "connected"){
    return "online";
  }else{
    return "offline";
  }});

Template.registerHelper('getOnlineColor', function(){
  if(Meteor.status().status === "connected"){
    return "green";
  }else{
    return "orange";
  }
});