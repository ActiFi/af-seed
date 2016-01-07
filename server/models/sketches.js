var fields = require('common-fields');

module.exports = function(sequelize, DataTypes) {
  var model =   sequelize.define("sketches", {
      id:           fields.PRIMARY_ID(),
      key:{
        type:DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4()
      },
      active:       fields.ACTIVE(),
      // data
      name:         fields.STRING_80(),
      description:  DataTypes.TEXT(),
      image:        fields.STRING_255(),
      gold:         fields.INTEGER(0, false),
      silver:       fields.INTEGER(0, false),
      copper:       fields.INTEGER(0, false)
    },
    {
      tableName: 'sketches',
      classMethods: {
        associate: function (models) {
          model.belongsTo(models.chapters, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          model.belongsTo(models.stories, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          model.belongsToMany(models.inventory, {
            through:'inventory2sketches'
          });
        }
      }
    }
  );
  return model;
};