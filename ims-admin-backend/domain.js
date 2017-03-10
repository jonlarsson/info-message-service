const uuid = require('node-uuid');
module.exports = function domain({storage, serviceScriptTemplate}) {
    function authorize(user) {
        if (!user || !user.id) {
            throw new Error("User is required");
        }
    }

    function authorizeAccessToService(user, serviceId) {
        authorize(user);
        if (!serviceId) {
            throw new Error("Service id is required");
        }
        return storage.userHasAccessToService(user, serviceId)
            .then(hasAccess => {
                if (!hasAccess) {
                    throw new Error("User is not authorized for that service");
                }
                return true;
            })
    }

    function listServices(user) {
        if (!user || !user.id) {
            return Promise.resolve([]);
        } else {
            return storage.listServices(user);
        }
    }

    function createService(user, serviceData) {
        authorize(user);
        const completeService = {
            id: uuid.v4(),
            name: serviceData.name,
            users: [
                user.id
            ]
        };
        return storage.addService(completeService);
    }

    function getService(user, id) {
        return authorizeAccessToService(user, id)
            .then(() => storage.getService(id));
    }

    function getServiceScript(id) {
        return storage.listMessages(id)
            .then(messages => serviceScriptTemplate.replace("\"__MESSAGES_TO_SHOW_\"", JSON.stringify(messages)));
    }

    function listMessages(serviceId) {
        return storage.listMessages(serviceId);
    }

    function createMessage(user, serviceId, messageData) {
        const message = {
            id: uuid.v4(),
            content: messageData.content
        };
        return authorizeAccessToService(user, serviceId)
            .then(() => storage.addMessage(serviceId, message));
    }

    function establishUser(authentication) {
        if (!authentication.provider || !authentication.externalId) {
            throw new Error("Provider and external id is required");
        }
        return storage.findUserByExternalId(authentication.provider, authentication.externalId)
            .then(user => {
                if (user) {
                    return user;
                } else {
                    const newUser = {
                        id: uuid.v4(),
                        name: authentication.name,
                        externalIds: {
                            [authentication.provider]: authentication.externalId
                        }
                    };
                    return storage.addUser(newUser);
                }
            })
    }

    return {
        listServices,
        createService,
        getService,
        getServiceScript,
        listMessages,
        createMessage,
        establishUser
    }
};