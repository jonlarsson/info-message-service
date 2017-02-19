module.exports = function storage() {
    const services = [{
        id: "cf5d2ef2-fa1b-4abf-b803-e87a5fecffb",
        name: "Admin backend itself"
    }].map(obj => JSON.stringify(obj));

    const messages = {
        "cf5d2ef2-fa1b-4abf-b803-e87a5fecffb": [
            JSON.stringify({id: "cf5d2ef2-fa1b-4abf-b803-e87a5fecff1", content: "Admin backends own message"})
        ]
    };

    function listServices() {
        return Promise.resolve(services.map(serviceJson => JSON.parse(serviceJson)));
    }

    function addService(service) {
        if (!service || !service.id) {
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

    return {
        listServices,
        addService,
        getService,
        listMessages,
        addMessage
    }
};