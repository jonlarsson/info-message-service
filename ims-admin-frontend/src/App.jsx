import React, {Component} from "react";
import {ServiceList} from "./ServiceList";
import {CreateServiceForm} from "./CreateServiceForm";
import {SendMessageForm} from "./SendMessageForm";
import {MessageList} from "./MessageList";
import {listServices, createService, createMessage, listMessages, getUser} from "./backendApi";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            services: [],
            user: {}
        };

        listServices().then(services => this.setState({services}));
        getUser().then(user => this.setState({user}));
    }

    onCreateService = (serviceData) => {
        createService(serviceData).then(service => this.setState({
            services: this.state.services.concat(service)
        }));
    };

    onServiceSelect = (service) => {
        this.setState({
            messages: [],
            selectedService: service
        });
        listMessages(service.id).then(messages => this.setState({
            messages: messages
        }))
    };

    backToList = (event) => {
        event.preventDefault();
        this.setState({
            selectedService: null
        });
    };

    onSendMessage = (messageData) => {
        createMessage(this.state.selectedService.id, messageData)
            .then(message => this.setState({
                messages: this.state.messages.concat(message)
            }));
    };

    render() {
        return (
            <div>
                <h1>Tjänster</h1>
                {!this.state.selectedService && <div>
                    <ServiceList services={this.state.services} onServiceSelect={this.onServiceSelect}/>
                    <CreateServiceForm onSubmit={this.onCreateService}/>
                </div>}
                {this.state.selectedService && <div>
                    <h2><a href="" onClick={this.backToList}>&lt;=</a> {this.state.selectedService.name}</h2>
                    <MessageList messages={this.state.messages}/>
                    <SendMessageForm onSubmit={this.onSendMessage}/>
                </div>}
                {!this.state.user.id && <div>
                    <a href="/api/auth/google">Logga in med google</a>
                </div>}
            </div>
        );
    }
}

export default App;
