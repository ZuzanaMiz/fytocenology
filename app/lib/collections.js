Plants = new Ground.Collection('plants');
Areas = new Ground.Collection('areas');
Cardinals = new Ground.Collection('cardinals');
Habitats = new Ground.Collection('habitats');
VegetationZone = new Ground.Collection('vegetationZone');
VegetationCover = new Ground.Collection('vegetationCover');
Reports = new Ground.Collection('reports');
UserSettings = new Ground.Collection('userSettings');
Photos = new Ground.Collection('photos');
SavedAreas = new Ground.Collection('savedAreas');
UserData = new Ground.Collection('userData');
Plants.schema = new SimpleSchema({
    name: {type: String},
    degree: {type: Number},
    vitality: {type: Number},
    sociability: {type: Number},
    reportId: {type: String, regEx: SimpleSchema.RegEx.Id},
    vegetation_degree: {type: String}

});

Plants.attachSchema(Plants.schema);

