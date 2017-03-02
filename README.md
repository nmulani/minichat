# Minimal Node TCP Chat Server and Client

This project consists of two pieces:

- **Chat Server** (`minichattcp.js`): Receives client chat messages and then broadcasts messages back out to to all other connected clients. Message and username data is sent and received as JSON objects.

Usage: `node minichattcp.js servername`

- **Chat Client** (`echoclient.js`): Sends chat messages to server and receives messages from server. Message and username data is sent and received as JSON objects.

Usage: `node echoclient.js username servername`
