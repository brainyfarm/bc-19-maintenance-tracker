'use strict';

const router = require('express').Router();
const db = require('../../models');
const application = require('../application');

router.use('/', application.isAuthenticated);

/* GET users listing. */
router.get('/', (req, res, next) => {
  db.User.findAll({ where: { role: 'user' } }).then((users) => {
    res.render('admin/users/index', { title: 'Users', users: users})
  })
});

module.exports = router;
