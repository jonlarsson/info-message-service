const loginHtml = `
<html>
    <head><title>Logga in</title></head>
<body>
    <form action="/api/auth/login" method="post">
        <label>
            Name <input type="text" name="name" required/>
        </label>
        <button type="submit">Login</button>
    </form>
</body>
</html>
`;
module.exports = function mockAuthentication({establishUser}) {
  function applyMiddleware() {
  }

  function applyRoutes(app) {
    app.get('/api/auth/google', function (req, res) {
      res.send(loginHtml);
    });

    app.post('/api/auth/login', function (req, res) {
      establishUser({
        provider: "mock",
        name: req.body.name,
        externalId: new Buffer(req.body.name).toString('base64')
      })
          .then((user) => {
            req.session.user = user;
            return res.redirect("/");
          })
          .catch((err) => res.status(500).send("error: " + err))

    });

    app.get('/api/auth/user', function (req, res) {
      res.json(userFromRequest(req) || {});
    });
  }

  function userFromRequest(req) {
    return req.session && req.session.user;
  }

  return {
    applyMiddleware,
    applyRoutes,
    userFromRequest
  }
};