var fields = require('common-fields');
var hasher = require('hasher');
var config = require('config');
var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var model =   sequelize.define("Users", {
      id:       fields.PRIMARY_ID(),
      active:   fields.ACTIVE(),
      email:    fields.STRING_80(),
      password: { type:DataTypes.TEXT },
      isAdmin:  { type:DataTypes.BOOLEAN, defaultValue:false, allowNull:false }
    },
    {
      tableName: 'users',
      instanceMethods: {
        setPassword:   function(password){
          var self = this;
          return new Promise(function(resolve, reject){
            hasher.hashPassword(password, function(err, hash){
              if(err) reject(err);
              self.password = hash;
              resolve(hash);
            })
          });
        },
        verifyPassword:hasher.verifyPassword
      }
    }
  );
  return model;
};