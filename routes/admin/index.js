'use strict';

const router = require('express').Router();
const users = require('./users');
const experts = require('./experts');
const db = require('../../models');

const application = require('../application');

router.use('/', application.isAuthenticated);
router.use('/', application.isAdmin);

router.use('/users', users);
router.use('/experts', experts);

router.get('/', (req, res) => {
  
  db.Request.findAll().then((requests) => {
    db.User.findAll({ where: { role: 'user' } }).then((users) => {
      db.User.findAll({ where: { role: 'expert' } }).then((experts) => {
        res.render('admin/index', { title: 'Dashboard', users: users, requests: requests, experts: experts});
      });
    })
  });
});

module.exports = router;
