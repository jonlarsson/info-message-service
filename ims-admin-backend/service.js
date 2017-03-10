const fs = require("fs");
const path = require("path");
const routing = require('./routing');
const setupDomain = require('./domain');
const setupStorage = require('./storage');
const setupHttp = require('./setup-http');

const serviceScriptTemplate = fs.readFileSync(path.resolve(__dirname, "generated/service-script-template.js")).toString();

// Layers and DI yeah!!
const storage = setupStorage();
const domain = setupDomain({storage: storage, serviceScriptTemplate});
const routes = routing(domain);

const port = process.env.PORT || 3003;
setupHttp({port: port, routes});

