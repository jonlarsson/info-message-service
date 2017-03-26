const pg = require('pg');

const services = [{
    id: "cf5d2ef2-fa1b-4abf-b803-e87a5fecffb",
    name: "Admin backend itself",
    users: [
        "cf5d2ef2-fa1b-4abf-b803-e87a5fecff2"
    ]
}].map(obj => JSON.stringify(obj));

const messages = {
    "cf5d2ef2-fa1b-4abf-b803-e87a5fecffb": [
        JSON.stringify({id: "cf5d2ef2-fa1b-4abf-b803-e87a5fecff1", content: "Admin backends own message"})
    ]
};

const users = [
    JSON.stringify({
        id: "cf5d2ef2-fa1b-4abf-b803-e87a5fecff2",
        externalIds: {
            google: "104406522336369958371"
        }
    })
];

module.exports = function pgStorage() {
    const config = {
        user: 'ims',
        database: 'ims',
        password: 'evilknievel',
        host: 'localhost',
        port: 5432,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

    const pool = new pg.Pool(config);

    pool.on('error', function (err, client) {
        // if an error is encountered by a client while it sits idle in the pool
        // the pool itself will emit an error event with both the error and
        // the client which emitted the original error
        // this is a rare occurrence but can happen if there is a network partition
        // between your application and the database, the database restarts, etc.
        // and so you might want to handle it and at least log it out
        console.error('idle client error', err.message, err.stack)
    });

    function query(queryString, args) {
        return new Promise((resolve, reject) => {
            pool.connect(function(err, client, done) {
                if(err) {
                    return reject({
                        message: 'error fetching client from pool',
                        details: err
                    });
                }
                client.query(queryString, args, function(err, result) {
                    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                    done(err);

                    if(err) {
                        return reject({
                            message: 'error running query',
                            details: err
                        });
                    }
                    return resolve(result);
                });
            });
        });
    }


    function listServices(user) {
        return query("select data from services where data->'users' ? $1", [user.id])
            .then(result => {
                return result.rows.map(row => row.data);
            });
    }

    function addService(service) {
        if (!service || !service.id || !service.users || !service.users.length) {
            return Promise.reject({error: "idRequired"});
        }
        services.push(JSON.stringify(service));
        return Promise.resolve(service);
    }

    function getService(serviceId) {
        const service = services
            .map(serviceJson =>JSON.parse(serviceJson))
            .filter(service => service.id = serviceId).pop();
        if (!service) {
            return Promise.reject({error: "notFound"});
        } else {
            return Promise.resolve(service);
        }
    }

    function listMessages(serviceId) {
        if (!serviceId) {
            return Promise.reject({error: "idRequired"});
        }
        return Promise.resolve((messages[serviceId] || []).map(messageJson => JSON.parse(messageJson)));
    }

    function addMessage(serviceId, message) {
        if (!serviceId) {
            return Promise.reject({error: "idRequired"});
        }
        const messageArray = messages[serviceId] = messages[serviceId] || [];
        messageArray.push(JSON.stringify(message));
        return Promise.resolve(message);
    }

    function findUserByExternalId(provider, externalId) {
        if (!externalId) {
            return Promise.reject({error: "idRequired"});
        }
        const result = users
            .map(userJson => JSON.parse(userJson))
            .filter(user => user.externalIds[provider] && user.externalIds[provider] === externalId)
            .pop();
        return Promise.resolve(result);
    }

    function addUser(user) {
        users.push(JSON.stringify(user));
        return Promise.resolve(user);
    }

    function userHasAccessToService(user, serviceId) {
        return getService(serviceId)
            .then(service => service.users.some(userId => user.id === userId));
    }

    return {
        listServices,
        addService,
        getService,
        listMessages,
        addMessage,
        findUserByExternalId,
        addUser,
        userHasAccessToService
    }

};