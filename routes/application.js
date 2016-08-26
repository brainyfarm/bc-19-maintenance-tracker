module.exports = {

  isAuthenticated: (req, res, next) => {

    if (req.isAuthenticated()) {
      next();
    } else {
      next(new Error(401));
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(new Error(401));
    }
  }

};
