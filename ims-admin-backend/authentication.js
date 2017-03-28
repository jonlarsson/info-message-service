const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const requiredEnvVariable = require('./required-env-variable');
const googleCallbackPath = "/api/auth/google/callback";

const googleConfig = {
  clientID: requiredEnvVariable("GOOGLE_CLIENT_ID"),
  clientSecret: requiredEnvVariable("GOOGLE_CLIENT_SECRET")
};

module.exports = function authentication({publicUrl, establishUser}) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: publicUrl + googleCallbackPath
      },
      function (token, tokenSecret, profile, done) {
        establishUser({
          provider: "google",
          name: profile.displayName,
          externalId: profile.id
        })
            .then(user => done(null, user))
            .catch(error => done(error));
      }
  ));

  function applyMiddleware(app) {
    app.use(passport.initialize());
    app.use(passport.session());
  }

  function applyRoutes(app) {
    app.get('/api/auth/google',
        passport.authenticate('google', {scope: ["openid", "email"]}));


    app.get(googleCallbackPath,
        passport.authenticate('google', {failureRedirect: '/'}),
        function (req, res) {
          res.redirect('/');
        });

    app.get('/api/auth/user', function (req, res) {
      res.json(userFromRequest(req) || {});
    });
  }

  function userFromRequest(req) {
    return req.session && req.session.passport && req.session.passport.user;
  }

  return {
    applyMiddleware,
    applyRoutes,
    userFromRequest
  }
};