'use strict';

const router = require('express').Router();
const users = require('./users');
const experts = require('./experts');
// const db = require('../models');

const application = require('../application');

router.use('/', application.isAuthenticated);
router.use('/', application.isAdmin);

router.use('/users', users);
router.use('/experts', experts);

module.exports = router;
