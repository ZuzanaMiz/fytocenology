
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    template: 'login',
    name:'login'
});

Router.route('/mapa', {
    template: 'map',
    name:'map'
});
Router.route('/gal', {
    template: 'galeria',
    name:'galeria'
});

Router.route('/pridajRastlinu/:_id',{
	template:'addPlant',
	name:'addPlant',
      data: function(){
        var currentArea = this.params._id;
        Session.set("report", currentArea);
        return Reports.findOne({ _id: currentArea });
}});

Router.route('/pridajOblast',{
	template:'addArea',
	name:'addArea'});

Router.route('/nastavenia',{
    template:'settings',
    name:'settings'});

Router.route('/zoznamOblasti',{
	template:'area_list',
	name:'area_list'});


Router.route('/pridajZaznam',{
    template:'addReport',
    name:'addReport'});

Router.route('/spravaOblasti/:_id',{
    template:'editArea',
    name:'spravaOblastiSId',
  data: function(){
        var currentArea = this.params._id;
        Session.set("Area", currentArea);
        return Areas.findOne({ _id: currentArea });
    }});

//vsade bola infoOblast
Router.route('/infoOblast/:_id', {
   	template:'infoArea',
	name:'infoArea',
    data: function(){
        var currentArea = this.params._id;
        return Areas.findOne({ _id: currentArea });
    }
});