const express = require('express');
const bodyParser = require('body-parser');
module.exports = function setupHttp({port, routes}) {
    const app = express();

    app.use(bodyParser.json());

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

    routes.forEach(route => {
        switch (route.method) {
            case "GET":
                app.get(route.path, nocache, function (req, res) {
                    route.handler({
                        pathParams: req.params,
                        queryParams: req.query
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
                        body: req.body
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
                        body: req.body
                    })
                        .then(result => responderFor(route)(res, result))
                        .catch(errorHandler.bind(null, req, res));
                });
                break;
            default:
                throw new Error("unknown method " + route.method);
        }
    });

    app.listen(port, function () {
        console.log('Example app listening on port ' + port)
    });
};