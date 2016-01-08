var bomb = require('bomb');

var schemes = {

  // public... do nothing...
  public:function(req, res, next){
    next();
  },

  // admin require logged in user with admin role.
  admin:function(req, res, next){
    if(!req.user || !req.user.isAdmin)
      next(new bomb('You do not have access to this content.', null, 'Not Authorized.'));
    else
      next();
  }

};

module.exports = schemes;