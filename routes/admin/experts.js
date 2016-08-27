'use strict';

const router = require('express').Router();
const db = require('../../models');
const application = require('../application');

router.use('/', application.isAuthenticated);

/* GET users listing. */
router.route('/')

  .get((req, res) => {
    db.User.findAll({ where: { role: 'expert' } }).then((users) => {
      res.render('admin/users/index', { title: 'Experts', users: users})
    })
  })


  .post((req, res) => {
    const expertAttr = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        role: 'expert'
      }

    db.User.create(expertAttr).then((user) => {
      if(user) {
        res.redirect('/admin/experts')
      } else {
        res.render('admin/experts/new', { title: 'Add Expert', expert: expert})
      }
    })
  });

router
  .get('/new', (req, res) => {
    const expert = {};
    res.render('admin/experts/new', { title: 'Add Expert', expert: expert})
  })

  .get('/:id/edit', (req, res) => {
    db.User.findById(req.params.id).then((expert) => {
      if (expert) {
        res.render('admin/experts/edit', { title: 'Update Expert', expert: expert})
      }
    })
  })

module.exports = router;
