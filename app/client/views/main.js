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
        if (Session.get("selectedItem") === 'areaList') {
         return "selected";
         } else {
         return "";
        }

    },

    isSelectedSettings: function () {
        if (Session.get("selectedItem") === 'settings') {
            return "selected";
        } else {
            return "";
        }
    },

    isSelectedHome: function () {
        if (Session.get("selectedItem") === "home") {
            return "selected";
        } else {
            return "";
        }
    },

});
