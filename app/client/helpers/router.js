Router.configure({
    layoutTemplate: 'areasSelected'

});

Router.route('/', {
    template: 'login',
    name: 'login',
    layoutTemplate: 'main'

});

Router.route('/mapa', {
    template: 'map',
    name: 'map'
});
Router.route('/galeria', {
    template: 'galeria',
    name: 'galeria'
});

Router.route('/pridajRastlinu/:_id', {
    template: 'addPlant',
    name: 'addPlant',
    data: function () {
        var currentArea = this.params._id;
        Session.set("report", currentArea);
        return Reports.findOne({_id: currentArea});
    }
});

Router.route('/pridajOblast', {
    template: 'addArea',
    name: 'addArea'
});

Router.route('/nastavenia', {
    template: 'settings',
    name: 'settings',
    layoutTemplate: 'settingsSelected',
    data: function () {
        return UserSettings.find({user: Meteor.userId()});
    }
});

Router.route('/zoznamOblasti', {
    template: 'area_list',
    name: 'area_list'
});


Router.route('/pridajZaznam', {
    template: 'addReport',
    name: 'addReport'
});

Router.route('/spravaOblasti/:_id', {
    template: 'editArea',
    name: 'spravaOblastiSId',
    data: function () {
        var currentArea = this.params._id;
        Session.set("Area", currentArea);
        return Areas.findOne({_id: currentArea});
    }
});

//vsade bola infoOblast
Router.route('/infoOblast/:_id', {
    template: 'infoArea',
    name: 'infoArea',
    data: function () {
        var currentArea = this.params._id;
        return Areas.findOne({_id: currentArea});
    }
});