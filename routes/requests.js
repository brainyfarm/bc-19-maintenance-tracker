'use strict';

const router = require('express').Router();
const db = require('../models');
const application = require('./application');
const multipart = require('connect-multiparty')();
const cloudinary = require('cloudinary').v2;

const Jusibe = require('jusibe');
const jusibePublicKey = process.env.JUSIBE_PUBLIC_KEY;
const jusibeAccessToken = process.env.JUSIBE_ACCESS_TOKEN;


router.use('/', application.isAuthenticated);
router.use('/:id/assign', application.isAdmin);
router.use('/:id/comments', application.isAdmin);
router.use('/:id/update_status', application.isAdmin);

router.route('/')
  // GET /requests
  .get((req, res, next) => {
    let query = { order: [ ['id', 'DESC'] ] };

    if (!req.user.isAdmin) {
      query.where = { UserId: req.user.id };
    }

    db.Request.findAll(query).then((requests) => {
      res.render('requests/index', { title: 'Maintenance Requests', requests: requests });
    })
  })

  // POST /requests
  .post(multipart, (req, res, next) => {
    const requestParams = {
      description: req.body.description,
      type: req.body.type,
      UserId: req.user.id
    };

    db.Request.create(requestParams).then((request) => {

      if (req.files.photo.size > 0) {
        const photoFile = req.files.photo.path;

        cloudinary.uploader.upload(photoFile, { tags: 'request_photo' })
          .then((photo) => {
            
            db.Request.update({ photoUrl: photo.url }, { where: { id: request.id } })
              .then((result) => {
                res.redirect(`/requests/${request.id}`);
              })
          });
      } else {
        res.redirect(`/requests/${request.id}`);
      }
    });
  });

router
  // GET /requests/new
  .get('/new', (req, res) => {
    const request = {}
    res.render('requests/new', { title: 'Submit Request', request: request });
  })

  // GET /requests/5/edit
  .get('/:id/edit', (req, res) => {
    db.Request.findById(req.params.id).then((request) => {
      if (!request)
        res.sendStatus(404);

      res.render('requests/edit', { title: 'Edit Request', request: request });
    });
  })

  // POST /requests/5/assign
  .post('/:id/assign', (req, res) => {
    const params = {
      ExpertId: req.body.expert,
      status: 'assigned',
      approved: true
    }
    db.Request.findById(req.params.id).then((request) => {
      db.Request.update(params, { where: { id: req.params.id } })
        .then((result) => {

          db.User.findById(params.ExpertId).then((expert) => {
            const jusibe = new Jusibe(jusibePublicKey, jusibeAccessToken);

            const payload = {
              to: expert.phone,
              from: 'Tracker App',
              message: `Hello ${expert.firstName()}\nYou have been assigned a task: ${request.description.slice(0, 30)}`
            };

            jusibe.sendSMS(payload, (err, res) => {
              if (res.statusCode === 200) {
                console.log(res.body);
              }
              else console.log(err);
            });

          });
          res.redirect(`/requests/${req.params.id}`);
        })

        .catch((err) => {
          console.log('[Error]', err);
        });
    })
  })

  // POST /requests/5/comments
  .post('/:id/comments', (req, res) => {
    const params = {
      UserId: req.user.id,
      body: req.body.body,
      RequestId: req.params.id
    };

    db.Comment.create(params).then((comment) => {
      res.redirect(`/requests/${req.params.id}`);
    });
  })

  // POST /requests/5/update_status
  .post('/:id/update_status', (req, res) => {
    const allowedStatuses = ['rejected', 'approved', 'resolved'];
    const params = { status: req.query.status };

    console.log('[LOG]', params)
    if (allowedStatuses.indexOf(params.status) !== -1) {
      if (params.status === 'approved') {
        params.approved = true;
      } else if (params.status === 'rejected') {
        params.ExpertId = null;
        params.approved = false;
      }

      db.Request.update(params, { where: { id: req.params.id } })
        .then((result) => {
          res.redirect(`/requests/${req.params.id}`);
        })

        .catch((err) => {
          console.log('[Error]', err);
        });
    } else {
      res.redirect(`/requests/${req.params.id}`);
    }
  });

router.route('/:id')

  // GET /requests/5
  .get((req, res, next) => {
    db.Request.findById(req.params.id, {
      include: [
        { model: db.User },
        { model: db.User, as: 'Expert' }
      ]
    }).then((request) => {
      if (!request) {
        res.sendStatus(404);
      }

      db.Comment.findAll({
        where: { RequestId: req.params.id },
        include: [db.User]
      }).then((comments) => {
        if (request.Expert) {
          res.render('requests/show', {
            title: request.description.slice(0, 30),
            request: request,
            comments: comments
          });
        } else {
          db.User.findAll({ where: { role: 'expert' } }).then((experts) => {
            res.render('requests/show', {
              title: request.description.slice(0, 30),
              request: request,
              experts: experts,
              comments: comments
            });
          });
        }
      });
    });
  })

  // POST /requests
  .post(multipart, (req, res, next) => {
    const requestParams = {
      description: req.body.description,
      type: req.body.type
    };


    db.Request.update(requestParams, { where: { id: req.params.id } })
      .then((result) => {
        if (req.files.photo.size > 0) {
          const photoFile = req.files.photo.path;

          cloudinary.uploader.upload(photoFile, { tags: 'request_photo' })
            .then((photo) => {
              
              db.Request.update({ photoUrl: photo.url }, { where: { id: req.params.id } })
                .then((result) => {
                  res.redirect(`/requests/${req.params.id}`);
                });
            });

        } else {
          res.redirect(`/requests/${req.params.id}`);
        }
      })

      .catch((err) => {
        console.log('[Error]', err);
      });

  })

  // DELETE /requests
  .delete((req, res) => {
    db.Request.findById(req.params.id).then((request) => {
      if (request) {
        request.destroy();
        res.redirect('/requests');
      } else {
        res.sendStatus(404);
      }
    })
  });

module.exports = router;
