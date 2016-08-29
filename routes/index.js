const router = require('express').Router();

/* GET home page. */
router
  // Home page
  .get('/', function(req, res, next) {
    res.render('home/index', { title: 'Maintenance Tracker' });
  })

  // Login page
  .get('/login', (req, res) => {
     if (req.user) {
      res.redirect('/auth/success');
    } else {
      res.render('home/login', { title: 'Login' });
    }
  })

  // signup
  .get('/signup', (req, res) => {
     if (req.user) {
      res.redirect('/auth/success');
      } else {
        res.render('home/signup', { title: 'Signup' });
      }
  });

module.exports = router;
