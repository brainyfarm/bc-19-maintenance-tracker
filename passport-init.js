const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models').User;


module.exports = function (passport) {

  // Serialize Session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize Session
  passport.deserializeUser((user, done) => {
    User.find({ id: user.id }).then((user) => {
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
        User.find({ email: email }).then((user) => {

          if (user) { // Found user

            if (User.validPassword(user, password)) { // Password match
              return done(null, user);
            } else {
              console.log('Invalid Password');
              return done(null, false); // redirect back to login page
            }

          } else {
            console.log(`User Not Found with email ${email}`);
            return done(null, false);
          }
        })

      }));

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    }, (req, email, password, done) => {

      User.find({ email: email }).then((user) => {
        if (user) {
          console.log(`User already exists with email: ${email}`);
          return done(null, false);
        } else {
          User.create({
            name: req.body.name,
            email: email,
            password: password
          }).then((user) => {
            if (user) {
              console.log(`${user.name} Registration succesful`);
              return done(null, user);
            } else {
              console.log(`Failed to register ${user.name}`);
              return done(null, false);
            }
          })
        }
      });

    }));
};