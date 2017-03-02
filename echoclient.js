/* Simple TCP client that sends data to server
 * and prints out server response (which should be an echo).
 *
 * Usage: node echoclient.js [username] [servername]
 */
var net = require('net');
var jsonStream = require('duplex-json-stream');
require('lookup-multicast-dns/global'); // Allows client to identify .local domains

// Capture arguments - first one should be username, second one should be server name
var args = process.argv.splice(2);
var user = args[0];
var server = args[1];

var client = net.connect(4444, server+".local");

client = jsonStream(client);

// Accept any input and write it to client socket
process.stdin.on('data', function(data) {
  // Send object with username and message
  client.write({username: user, message: data.toString()});
});

// Print out any chat messages sent by other users
client.on('data', function (data) {
  process.stdout.write(data.username + "> " + data.message+"\n");
});

client.on('end', () => {
  console.log('Disconnected from server');
});

client.on('error', () => {
  console.log('Client encountered an error. Check if network connection or server is running properly');
})
