const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleCallbackPath = "/api/auth/google/callback";

module.exports = function authentication({googleConfig, publicUrl, establishUser}) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: googleConfig.clientID,
            clientSecret: googleConfig.clientSecret,
            callbackURL: publicUrl + googleCallbackPath
        },
        function(token, tokenSecret, profile, done) {
            establishUser({
                provider: "google",
                name: profile.displayName,
                externalId:  profile.id
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
            passport.authenticate('google', { scope: ["openid", "email"] }));


        app.get(googleCallbackPath,
            passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                res.redirect('/');
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