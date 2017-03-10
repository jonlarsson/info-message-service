const express = require('express');

module.exports = function routing(domain) {
    return [
        {
            path: "/api/services",
            method: "GET",
            handler: ({user}) => domain.listServices(user)
        },
        {
            path: "/api/services",
            method: "POST",
            handler: ({body, user}) => domain.createService(user, body)
        },
        {
            path: "/api/services/:id",
            method: "GET",
            handler: ({pathParams, user}) => {
                return domain.getService(user, pathParams.id)
            }
        },
        {
            path: "/api/:serviceId/ims-service-script.js",
            method: "GET",
            responseType: "javascript",
            handler: ({pathParams}) => {
                return domain.getServiceScript(pathParams.serviceId);
            }
        },
        {
            path: "/api/services/:id/messages",
            method: "GET",
            handler: ({pathParams}) => {
                return domain.listMessages(pathParams.id)
            }
        },
        {
            path: "/api/services/:id/messages",
            method: "POST",
            handler: ({pathParams, body, user}) => {
                return domain.createMessage(user, pathParams.id, body);
            }
        }
    ];
};
