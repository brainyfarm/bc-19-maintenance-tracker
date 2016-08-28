const express = require('express');
const router = express.Router();

module.exports = (passport) => {

	router
	  // Loog in
	  .post('/login', passport.authenticate('login', {
      successRedirect: '/auth/success',
      failureRedirect: '/login'
    }))

	  // Sign up
	  .post('/signup', passport.authenticate('signup', {
      successRedirect: '/auth/success',
      failureRedirect: '/signup'
    }))

    .get('/success', (req, res) => {
      if (req.user && req.user.isAdmin) {
        res.redirect('/admin');  
      } else {
        res.redirect('/requests');
      }
    })

	  // Log out
    .get('/logout', (req, res) => {
      req.logOut();
      req.user = null;
      req.session.destroy();
      res.redirect("/");
    });

	return router;

};
