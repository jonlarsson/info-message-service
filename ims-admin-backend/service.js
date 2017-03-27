const fs = require("fs");
const path = require("path");
const routing = require('./routing');
const setupDomain = require('./domain');
const setupStorage = require('./mock-storage');
const setupAuthentication = require('./mock-authentication');
const setupHttp = require('./setup-http');
const apiDocumentation = require('./api-documentation');
const requiredEnvVariable = require('./required-env-variable');

const serviceScriptTemplate = fs.readFileSync(path.resolve(__dirname, "generated/service-script-template.js")).toString();

const publicUrl = requiredEnvVariable("PUBLIC_URL", "http://localhost:3000");
const sessionSecret = requiredEnvVariable("SESSION_SECRET", "secretcat");

const port = process.env.PORT || 3003;

// Layers and DI yeah!!
const storage = setupStorage();
const domain = setupDomain({storage: storage, serviceScriptTemplate});
const routes = routing(domain);
const authentication = setupAuthentication({publicUrl, establishUser: domain.establishUser, });
setupHttp({port: port, routes, sessionSecret, authentication, apiDocumentation});

