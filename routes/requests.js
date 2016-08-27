'use strict';

const router = require('express').Router();
const db = require('../models');
const application = require('./application');


router.use('/', application.isAuthenticated);

router.route('/')

  .get((req, res, next) => {
    let query = { order: 'id' };

    if (!req.user.isAdmin) {
      query.where = { UserId: req.user.id };
    }

    db.Request.findAll(query).then((requests) => {
      res.render('requests/index', { title: 'Maintenance Requests', requests: requests });
    })
  })

  .post((req, res, next) => {
    const requestParams = {
      description: req.body.description,
      type: req.body.type,
      UserId: req.user.id
    };

    db.Request.create(requestParams).then((request) => {
      if(!request) {
        res.render('requests/new', { title: 'Submit Request', request: requestParams });
      }

      res.redirect('/requests');
    })
  });

router

  .get('/new', (req, res) => {
    const request = { description: '', type: 'maintenance' }
    res.render('requests/new', { title: 'Submit Request', request: request });
  })

  .get('/:id/edit', (req, res) => {
    db.Request.findById(req.params.id).then((request) => {
      if(!request)
        res.sendStatus(404);

      res.render('requests/edit', { title: 'Edit Request', request: request });
    });
  });

router.route('/:id')

  .get((req, res, next) => {
    db.Request.findById(req.params.id, { include: [ db.User, { model: db.User, as: 'Expert' } ] })
      .then((request) => {
      if(!request)
        res.sendStatus(404);
        console.log('[LOG]', request);
      res.render('requests/show', { title:  request.description.slice(0, 30), request: request });
    });
  })

  .post((req, res, next) => {
    const requestParams = {
      description: req.body.description,
      type: req.body.type,
    };


    db.Request.update(requestParams, { where: { id: req.params.id }})
      .then((result) => {
        console.log(result);
        res.redirect('/requests');
      })

      .catch((err) => {
        console.log('[Error]', err);
      });

  })

  .delete((req, res) => {
    db.Request.findById(req.params.id).then((request) => {
      if(request) {
        request.destroy();
        res.redirect('/requests');
      } else {
        res.sendStatus(404);
      }
    })
  });

module.exports = router;
