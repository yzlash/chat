const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function(socket) {
    console.log("A user connected!");

    socket.on("message", function(message) {
        console.log("Message recived:", message);

        wss.clients.forEach(function(client) {
            client.send(message);
        });
    });
    });


server.listen(3000, function() {
    console.log("WebSocket server is running on port 3000");
});