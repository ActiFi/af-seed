
var _ = require('lodash');
var db = require('db');
var promise = require('sequelize').Promise;

// our fake data
//var mockStory2 = {id:2, name:'Some other story'};
var mockStory = {id:1, name:'Journal of Magnus Korad'};
var mockChapter1 = {id:1, name:'Chapter 1', story_id:mockStory.id };
var mockChapter2 = {id:2, name:'Chapter 2', story_id:mockStory.id };
var sketch1 = {id:1, name:'Sketch 1', story_id:mockStory.id, chapter_id:mockChapter1.id, image:'0', copper:10 };
var sketch2 = {id:2, name:'Sketch 2', story_id:mockStory.id, chapter_id:mockChapter1.id, image:'1', copper:8 };
var sketch3 = {id:3, name:'Sketch 3', story_id:mockStory.id, chapter_id:mockChapter2.id, image:'2', silver:1, copper:2 };
var sketch4 = {id:4, name:'Sketch 4', story_id:mockStory.id, chapter_id:mockChapter2.id, image:'3' };
var sketch5 = {id:5, name:'Sketch 5', story_id:mockStory.id, chapter_id:mockChapter2.id, image:'4', gold:5, silver:4, copper:3 };
var inv1 = { id:1, name:'Wooden Sword', description:'The finest sword in all the land.' };
var inv2 = { id:2, name:'Cloth Shirt', description:'The finest shirt ever.' };
var inv3 = { id:3, name:'Cloth Pants', description:'Not very good.' };

var sketches = [];

module.exports = function(){

  console.log('-----');
  console.log('----- Database Populating...');
  console.log('-----');

  //
  // user (admin)
  db.Users.create({email:'alberg.nate@gmail.com', isAdmin:true})
    .then(function(user){
      return user.setPassword('abc123')
        .then(function(hash){
          return user.save();
        })
    })
    ['catch'](console.log);
  // user (non-admin)
  db.Users.create({email:'john.doe@gmail.com'})
      .then(function(user){
        return user.setPassword('321bca')
            .then(function(hash){
              return user.save();
            })
      })
      ['catch'](console.log);

  return db.stories.create(mockStory)

    //
    // chapter
    .then(function(story) {
      return db.chapters.bulkCreate([mockChapter1, mockChapter2])
    })

    //
    // sketches
    .then(function(response){
      return db.sketches.bulkCreate([sketch1,sketch2, sketch3, sketch4, sketch5])
    })
    //.mapSeries(function(row){ return row.reload(); }) // bulk insert requires reload to get Id's

    //
    // inventory
    .then(function(response){
      sketches = response;
      return db.inventory.bulkCreate([inv1, inv2, inv3])
    })
    //.mapSeries(function(row){ return row.reload(); }) // bulk insert requires reload to get Id's
    .then(function(inventories){
      return inventories[0].addSketches(sketches)
        .then(function(response){
          return inventories[1].addSketches([sketches[0], sketches[2], sketches[4]])
        })
        .then(function(response){
          return inventories[2].addSketches([sketches[0], sketches[1], sketches[2]])
        })
    })
    .then(function(response){
      console.log('-----');
      console.log('----- Database Populating... Complete');
      console.log('-----');
    })
    .catch(console.log);
};