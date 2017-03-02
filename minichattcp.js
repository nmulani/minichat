/* Minimal chat server that receives data from individual clients and then
 * broadcasts received data to all clients.
 * 
 * Usage: node minichattcp.js [servername]
 */

var net = require('net');
var jsonStream = require('duplex-json-stream');

// First argument to server should be a name for the server
var args = process.argv.splice(2);
var servername = args[0];

// Make sure server is accessible over multicast DNS
var register = require('register-multicast-dns');
register(servername);


// Allows us to manage multiple sockets for clients connected to server
var streamSet = require('stream-set');

var activeSockets = streamSet();

var server = net.createServer(function (socket){

  // Turn our data stream into an object streamSet
  socket = jsonStream(socket);

  // Add any new sockets to our list of active sockets
  // Whenever a socket ends or errors, it will automatically be removed from the streamSet
  activeSockets.add(socket);

  socket.on('data', function(data){

    // Whenever the server receives data, send it back to all connected clients except for sender
    activeSockets.forEach(function (client){
      if(client !== socket){
        client.write({ username: data.username, message: data.message });
      }
    });

    // Also show what the server received in the terminal
    console.log(data.username +"> " + data.message);

  });
});

server.on('error', (err) => {
  throw err;
});

server.listen('4444');
