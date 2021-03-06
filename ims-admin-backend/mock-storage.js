module.exports = function storage() {
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
        mock: "YWRtaW4="
      }
    })
  ];

  function listServices(user) {
    return Promise.resolve(services
        .map(serviceJson => JSON.parse(serviceJson))
        .filter(service => service.users.some(userId => user.id === userId)));
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
        .map(serviceJson => JSON.parse(serviceJson))
        .filter(service => service.id === serviceId).pop();
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