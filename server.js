const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;

app.use(cors());
app.use(express.static('public'));

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Log the incoming message for debugging
        console.log('Received:', message);
        
        // Broadcast incoming messages to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
