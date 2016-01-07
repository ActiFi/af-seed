var fields = require('common-fields');

module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("inventory", {
      id:           fields.PRIMARY_ID(),
      active:       fields.ACTIVE(),
      name:         fields.STRING_80(),
      description:  DataTypes.TEXT(),
      image:        fields.STRING_255()
    },
    {
      tableName: 'inventory',
      classMethods: {
        associate: function (models) {
          model.belongsToMany(models.sketches, {
            through:'inventory2sketches'
          });
        }
      }
    }
  );
  return model;
};