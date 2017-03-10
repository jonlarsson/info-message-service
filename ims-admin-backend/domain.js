const uuid = require('node-uuid');
module.exports = function domain({storage, serviceScriptTemplate}) {

    function listServices() {
        return storage.listServices();
    }

    function createService(serviceData) {
        const completeService = {
            id: uuid.v4(),
            name: serviceData.name
        };
        return storage.addService(completeService);
    }

    function getService(id) {
        return storage.getService(id);
    }

    function getServiceScript(id) {
        return storage.listMessages(id)
            .then(messages => serviceScriptTemplate.replace("\"__MESSAGES_TO_SHOW_\"", JSON.stringify(messages)));
    }

    function listMessages(serviceId) {
        return storage.listMessages(serviceId);
    }

    function createMessage(serviceId, messageData) {
        const message = {
            id: uuid.v4(),
            content: messageData.content
        };
        return storage.addMessage(serviceId, message);
    }

    return {
        listServices,
        createService,
        getService,
        getServiceScript,
        listMessages,
        createMessage
    }
};