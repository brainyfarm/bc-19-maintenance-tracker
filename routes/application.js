module.exports = {

  isAuthenticated: (req, res, next) => {

    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  },

  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      return next();
    } 
    
    res.redirect('/login');
  }

};
