var express = require('express');
var router = express.Router();

/* GET home page. */
router
  // Home page
  .get('/', function(req, res, next) {
    res.render('home/index', { title: 'Express' });
  })

  // Login page
  .get('/login', (req, res) => {
    res.render('home/login', { title: 'Login' });
  })

  // signup
  .get('/signup', (req, res) => {
    res.render('home/signup', { title: 'Signup' });
  });

module.exports = router;
