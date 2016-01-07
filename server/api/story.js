var Joi = require('joi');

module.exports = [

  {
    method:'get',
    path: '/stories/latest',
    handler: function(req, res, next){
      return req.db.stories.findOne({
            attributes: ['id'],
            order: '"createdOn" DESC'
          })
          .then(function(story){
            return req.db.sketches.findOne({
              attributes: [['id','sketch_id'], ['story_id', 'id'], 'chapter_id'],
              where:{ story_id:story.id },
              order: '"createdOn" DESC'
            })
          })
          .then(res.success)
          .catch(res.error)
    }
  },

  {
    method:'get',
    path: '/stories/:id',
    handler: function(req, res, next){
      req.db.stories.findOne({
        where:{ id:req.params.id }
      })
      .then(res.success)
      .catch(res.error)
    }
  },


  {
    method:'get',
    path: '/stories/:id/hierarchy',
    handler: function (req, res){
      var result = {};
      return req.db.stories.findOne({
        attributes:['id','name'],
        where:{ id:req.params.id },
        include:[{
          attributes:['id','name'],
          model:req.db.chapters,
          //as:'chapters',
          include:[{
            attributes: ['id', 'name'],
            model: req.db.sketches
            //as:'sketches'
          }]
        }]
      })
      .then(res.success)
      .catch(res.error);
    }
  },


  {
    method:'get',
    path: '/stories/:id/:sketch',
    handler: function (req, res){
      return req.db.sketches.findOne({
        where:{
          id:req.params.sketch,
          story_id:req.params.id,
          active:true
        },
        order: 'id DESC',
        include:[{
          model:req.db.inventory,
          through:{ attributes:[] } // excludes mm table
        }]
      })
      .then(res.success)
      .catch(res.error);
    }
  },



  {
    method:'get',
    path: '/stories/:id/start',
    handler: function (req, res){
      return req.db.sketches.findOne({
          where:{ story_id:req.params.id, active:true },
          order: 'id ASC',
          include:[{
            model:req.db.inventory
          }]
        })
        .then(res.success)
        .catch(res.error);
    }
  },
  {
    method:'get',
    path: '/stories/:id/latest',
    handler: function (req, res){
      return req.db.sketches.findOne({
          where:{ story_id:req.params.id, active:true },
          order: 'id DESC',
          include:[{
            model:req.db.inventory
          }]
        })
        .then(res.success)
        .catch(res.error);
    }
  }
];