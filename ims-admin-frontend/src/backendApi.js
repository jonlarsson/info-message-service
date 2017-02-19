import axios from "axios";

export function listServices() {
    return axios.get("/api/services").then(response => response.data);
}


export function createService(serviceData) {
    return axios.post("/api/services", serviceData).then(response => response.data);
}

export function listMessages(serviceId) {
    return axios.get("/api/services/" + serviceId + "/messages").then(response => response.data);
}

export function createMessage(serviceId, messageData) {
    return axios.post("/api/services/" + serviceId + "/messages", messageData).then(response => response.data);
}