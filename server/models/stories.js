var fields = require('common-fields');

module.exports = function(sequelize, DataTypes) {
  var model =   sequelize.define("stories", {
      id:         fields.PRIMARY_ID(),
      active:     fields.ACTIVE(),
      name:       fields.STRING_80()
    },
    {
      tableName: 'stories',
      classMethods: {
        associate: function (models) {
          model.hasMany(models.chapters);
          model.hasMany(models.sketches);
        }
      }
    }
  );
  return model;
};