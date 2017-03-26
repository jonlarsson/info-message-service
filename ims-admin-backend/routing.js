const express = require('express');
const apiDocumentation = require('./api-documentation');

/**
 * @swagger
 * definitions:
 *   ServiceData:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *   Service:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - users
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       users:
 *         type: array
 *         description: an array of id:s of the users having access to this service
 *         items:
 *           type: string
 *   MessageData:
 *     type: object
 *     properties:
 *       content:
 *         type: string
 *   Message:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       content:
 *         type: string
 *
 *
 */

module.exports = function routing(domain) {
    return [
        /**
         * @swagger
         * /api/services:
         *   get:
         *     description: List all services available to the user
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: a list of services
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Service'
         */
        {
            path: "/api/services",
            method: "GET",
            handler: ({user}) => domain.listServices(user)
        },
        /**
         * @swagger
         * /api/services:
         *   post:
         *     description: Create a new service
         *     consumes:
         *       - application/json
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: service
         *         in: body
         *         schema:
         *           $ref: '#/definitions/ServiceData'
         *     responses:
         *       200:
         *         description: the newly created service
         *         schema:
         *           $ref: '#/definitions/Service'
         */
        {
            path: "/api/services",
            method: "POST",
            handler: ({body, user}) => domain.createService(user, body)
        },
        /**
         * @swagger
         * /api/services/{id}:
         *   get:
         *     description: Get a service by id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: id of service
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: the service
         *         schema:
         *           $ref: '#/definitions/Service'
         */
        {
            path: "/api/services/:id",
            method: "GET",
            handler: ({pathParams, user}) =>  domain.getService(user, pathParams.id)
        },
        /**
         * @swagger
         * /api/{serviceId}/ims-service-script.js:
         *   get:
         *     description: Get an embeddable script for the service to display the messages to it's users
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: serviceId
         *         in: path
         *         description: id of service
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: an embeddable javascript
         */
        {
            path: "/api/:serviceId/ims-service-script.js",
            method: "GET",
            responseType: "javascript",
            handler: ({pathParams}) => domain.getServiceScript(pathParams.serviceId)
        },
        /**
         * @swagger
         * /api/services/{id}/messages:
         *   get:
         *     description: List all the messages for a service
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: id of service
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: a list of messages
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Message'
         */
        {
            path: "/api/services/:id/messages",
            method: "GET",
            handler: ({pathParams}) => domain.listMessages(pathParams.id)
        },
        /**
         * @swagger
         * /api/services/{id}/messages:
         *   post:
         *     description: Add a message for the service
         *     consumes:
         *       - application/json
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: id
         *         in: path
         *         description: id of service
         *         required: true
         *         type: string
         *       - name: message
         *         in: body
         *         schema:
         *           $ref: '#/definitions/MessageData'
         *     responses:
         *       200:
         *         description: a list of services
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Message'
         */
        {
            path: "/api/services/:id/messages",
            method: "POST",
            handler: ({pathParams, body, user}) => domain.createMessage(user, pathParams.id, body)
        }
    ];
};
