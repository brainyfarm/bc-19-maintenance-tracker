const express = require('express');
const router = express.Router();

module.exports = (passport) => {

	router
	  // Loog in
	  .post('/login', passport.authenticate('login', {
      successRedirect: '/',
      failureRedirect: '/login'
    }))

	  // Sign up
	  .post('/signup', passport.authenticate('signup', {
      successRedirect: '/',
      failureRedirect: '/signup'
    }))

	  // Log out
    .get('/logout', (req, res) => {
      req.logOut();
      req.user = null;
      req.session.destroy();
      res.redirect("/");
    });

	return router;

};
