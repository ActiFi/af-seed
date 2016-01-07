var fields = require('common-fields');

module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("inventory2sketches", {
      id: fields.PRIMARY_ID()
      // the rest added by sequelize
    },
    {
      tableName: 'inventory2sketches_mm',
      underscored: true
    }
  );
  return model;
};