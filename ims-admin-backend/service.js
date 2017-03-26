const fs = require("fs");
const path = require("path");
const routing = require('./routing');
const setupDomain = require('./domain');
const setupStorage = require('./pg-storage');
const setupAuthentication = require('./authentication');
const setupHttp = require('./setup-http');

const serviceScriptTemplate = fs.readFileSync(path.resolve(__dirname, "generated/service-script-template.js")).toString();

function requiredEnvVariable(variableName) {
    if (!process.env[variableName]) {
        throw new Error("Environment variable " + variableName);
    }
    return process.env[variableName];
}

const sessionSecret = requiredEnvVariable("SESSION_SECRET");
const publicUrl = requiredEnvVariable("PUBLIC_URL");
const googleConfig = {
    clientID: requiredEnvVariable("GOOGLE_CLIENT_ID"),
    clientSecret: requiredEnvVariable("GOOGLE_CLIENT_SECRET")
};

const port = process.env.PORT || 3003;

// Layers and DI yeah!!
const storage = setupStorage();
const domain = setupDomain({storage: storage, serviceScriptTemplate});
const routes = routing(domain);
const authentication = setupAuthentication({publicUrl, googleConfig, establishUser: domain.establishUser, });
setupHttp({port: port, routes, sessionSecret, authentication});

