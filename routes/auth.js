const express = require('express');
const router = express.Router();

module.exports = (passport) => {

	router
	  // Loog in
	  .post('/login', passport.authenticate('login', {
      successRedirect: '/auth/success',
      failureRedirect: '/login',
      session: true
    }))

	  // Sign up
	  .post('/signup', passport.authenticate('signup', {
      successRedirect: '/auth/success',
      failureRedirect: '/signup',
      session: true
    }))

    .get('/success', (req, res) => {
      // console.log('[LOG]', req.session, req.user)
      res.redirect('/requests');
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
