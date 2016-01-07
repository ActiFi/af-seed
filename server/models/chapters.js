var fields = require('common-fields');

module.exports = function(sequelize, DataTypes) {
  var model =   sequelize.define("chapters", {
      id:       fields.PRIMARY_ID(),
      active:   fields.ACTIVE(),
      name:     fields.STRING_80()
    },
    {
      tableName: 'chapters',
      classMethods: {
        associate: function(models) {
          model.belongsTo(models.stories, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          model.hasMany(models.sketches);
        }
      }
    }
  );
  return model;
};