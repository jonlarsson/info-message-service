# Info Message Service

The purpose of this service is to provide a simple, non obtrusive way of delivering messages to 
the users of a web application.

## Local development setup
The root package.json is there for the sake of heroku deployment and is not really suitable for development.

```bash
cd ims-admin-backend
npm install
npm run start
cd ../ims-admin-frontend
npm install
npm serve
```
Open <http://localhost:3000/> for a basic admin gui. Use 'admin' as name when logging in for access to the
example service.

Open <http://localhost:3003/api-docs/#/default> for swagger api docs 

## Usage

- Login using any name, or 'admin' for access to the example service.
- Create a service
- Embed the info message plugin script
- Publish messages, all messages will be displayed to all the users of the application