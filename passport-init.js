const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models').User;


module.exports = function (passport) {

  // Serialize Session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize Session
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id: id } }).then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(new Error(), null);
      }
    });
  });

  // Auth
  passport.use('login', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    }, (req, email, password, done) => {
        User.findOne({ where: { email: email } }).then((user) => {
          if (user) { // Found user

            if (User.validPassword(user, password)) { // Password match
              return done(null, user,  { message: 'Login successful.' });
            } else {
              return done(null, false, { message: 'Incorrect password.' }); // redirect back to login page
            }

          } else {
            return done(null, false, `User with email ${email} not found`);
          }
        })

      }));

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    }, (req, email, password, done) => {

      User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
          return done(null, false, `User with email: ${email} already exists`);
        } else {
          User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: email,
            password: password
          }).then((user) => {
            if (user) {
              return done(null, user, `${user.email} Registration succesful`);
            } else {
              return done(null, false, `Failed to register ${user.email}`);
            }
          })
        }
      });

    }));
};