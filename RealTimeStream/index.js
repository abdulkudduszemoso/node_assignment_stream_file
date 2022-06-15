import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import fs from 'fs';

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:4200"]
    }
});

io.on('connection', (socket) => {
    let firstContent = fs.readFileSync("./public/fileToStream.txt", "utf8");
    socket.emit('first content', firstContent);
    fs.watchFile(
        "./public/fileToStream.txt",
        {
            bigint: false,
            persistent: true,
        },
        (curr, prev) => {
            const fileContent = fs.readFileSync("./public/fileToStream.txt", "utf8");
            socket.emit('file changes', fileContent);
        }
    );

});

server.listen(port);
