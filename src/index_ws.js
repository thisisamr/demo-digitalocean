import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
const server = createServer();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "./client")));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => console.log("ws running on 8080"));

/*web sockets*/
const ws_server = new WebSocketServer({ server });
ws_server.on("connection", (ws) => {
  console.log("clients connected: ", ws_server.clients.size);
  ws_server.broadcast(`current visitors ${ws_server.clients.size}`);
  if (ws.readyState == ws.OPEN) {
    ws.send("hello there");
  }
  ws.on("close", (ws) => {
    console.log("a client has disconnected");
  });
  ws.onmessage = (e) => console.log(e.data);
});

ws_server.broadcast = (data) => {
  ws_server.clients.forEach((client) => client.send(data));
};
