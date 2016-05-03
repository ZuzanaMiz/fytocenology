Plants = new Mongo.Collection('plants');
Areas = new Mongo.Collection('areas');
Cardinals = new Ground.Collection('cardinals');
Habitats = new Ground.Collection('habitats');
VegetationZone = new Mongo.Collection('vegetationZone');
VegetationCover = new Ground.Collection('vegetationCover');
Reports = new Mongo.Collection('reports');
UserSettings = new Mongo.Collection('userSettings');
Photos = new Mongo.Collection('photos');
SavedAreas = new Mongo.Collection('savedAreas');

Plants.schema = new SimpleSchema({
    name: {type: String},
    degree: {type: Number},
    vitality: {type: Number},
    sociability: {type: Number},
    reportId: {type: String, regEx: SimpleSchema.RegEx.Id}
});

Plants.attachSchema(Plants.schema);

