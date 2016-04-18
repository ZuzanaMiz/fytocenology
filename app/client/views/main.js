Template.registerHelper('getOnlineStatus', function () {
    if (Meteor.status().status === "connected") {
        return "online";
    } else {
        return "offline";
    }
});

Template.registerHelper('getOnlineButtonColor', function () {
    if (Meteor.status().status === "connected") {
        return "btn-success";
    } else {
        return "btn-warning";
    }
});
Template.main.helpers({
    isSelectedAreaList: function () {
        /*  if (Session.get("selectedItem") === 'areaList') {
         return "selected";
         } else {
         return "";
         }*/
        var currentRoute = Router.current();
        console.log("route" + currentRoute.name);
    },
    setSelectedAreaList: function () {
    },
    isSelectedSettings: function () {
        if (Session.get("selectedItem") === 'settings') {
            return "selected";
        } else {
            return "";
        }
    },
    setSelectedSettings: function () {
        Session.update("selectedItem", "settings");
    },
    isSelectedHome: function () {
        if (Session.get("selectedItem") === "home") {
            return "selected";
        } else {
            return "";
        }
    },
    setSelectedHome: function () {
        Session.setPersistent("selectedItem", "home");
    },
});
Template.main.events({
    'click .areaListHref': function () {
        console.log("settinguje href");
        Session.update("selectedItem", "areaList");

    }
});