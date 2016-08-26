'use strict';

const router = require('express').Router();
const users = require('./users');
// const db = require('../models');

const application = require('../application');

router.use('/', application.isAuthenticated);
router.use('/', application.isAdmin);

router.use('/users', users);

module.exports = router;