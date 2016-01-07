var config = require('config');
var bomb = require('bomb');

var schemes = {

  // public... do nothing...
  public:function(req, res, next){
    next();
  },


  // admin require logged in user with admin role.
  admin:function(req, res, next){
    if(!req.user || !req.user.isAdmin)
      next(bomb.UNAUTHORIZED());
    else
      next();
  }

};

module.exports = schemes;