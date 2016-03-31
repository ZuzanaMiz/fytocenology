Template.registerHelper("localizedDateAndTime", function (date) {
    if (date)
        return moment(date).format('D MMMM YYYY, h:mm:ss a');
});