const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleCallbackPath = "/api/auth/google/callback";
module.exports = function setupHttp({port, routes, authentication, sessionSecret, apiDocumentation}) {
    const app = express();

    app.use(cookieParser());
    app.use(session({ secret: sessionSecret }));
    app.use(bodyParser.json());
    authentication.applyMiddleware(app);
    apiDocumentation.applyMiddleware(app);

    function errorHandler(req, res, error) {
        res.status(500).send(error);
    }

    function nocache(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }

    function respondWithJson(response, result) {
        response.json(result);
    }

    function respondWithJavascript(response, result) {
        response.type("application/javascript").send(result);
    }

    function responderFor(route) {
       if (route.responseType === "javascript") {
           return respondWithJavascript;
       } else {
           return respondWithJson;
       }
    }

    function userIn(req) {
        return req.session && req.session.passport && req.session.passport.user;
    }

    routes.forEach(route => {
        switch (route.method) {
            case "GET":
                app.get(route.path, nocache, function (req, res) {
                    route.handler({
                        pathParams: req.params,
                        queryParams: req.query,
                        user: userIn(req)
                    })
                        .then(result => responderFor(route)(res, result))
                        .catch(errorHandler.bind(null, req, res));
                });
                break;
            case "POST":
                app.post(route.path, nocache, function (req, res) {
                    route.handler({
                        pathParams: req.params,
                        queryParams: req.query,
                        body: req.body,
                        user: userIn(req)
                    })
                        .then(result => responderFor(route)(res, result))
                        .catch(errorHandler.bind(null, req, res));
                });
                break;
            case "PUT":
                app.put(route.path, nocache, function (req, res) {
                    route.handler({
                        pathParams: req.params,
                        queryParams: req.query,
                        body: req.body,
                        user: userIn(req)
                    })
                        .then(result => responderFor(route)(res, result))
                        .catch(errorHandler.bind(null, req, res));
                });
                break;
            default:
                throw new Error("unknown method " + route.method);
        }
    });

    authentication.applyRoutes(app);

    app.use(express.static('./generated/frontend'));

    app.listen(port, function () {
        console.log('Example app listening on port ' + port)
    });
};