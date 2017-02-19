const express = require('express');

module.exports = function routing(domain) {
    return [
        {
            path: "/api/services",
            method: "GET",
            handler: () => domain.listServices()
        },
        {
            path: "/api/services",
            method: "POST",
            handler: ({body}) => domain.createService(body)
        },
        {
            path: "/api/services/:id",
            method: "GET",
            handler: ({pathParams}) => {
                return domain.getService(pathParams.id)
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
            handler: ({pathParams, body}) => {
                return domain.createMessage(pathParams.id, body);
            }
        }
    ];
};
