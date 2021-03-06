require('dotenv').config({silent: true});

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')

const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const routes = require('./routes');
const requests = require('./routes/requests');
const adminRoutes = require('./routes/admin');

const auth = require('./routes/auth')(passport);
const config = require('./config/settings');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: config.secretKeyBase,
  store: new SequelizeStore({
    db: db,
    table: 'Session'
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 604800000 }
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./lib/view-helpers'));


app.use('/', routes);
app.use('/auth', auth);
app.use('/requests', requests);

app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

require('./passport-init')(passport);
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
