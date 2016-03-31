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
        return "btn-error";
    }
});