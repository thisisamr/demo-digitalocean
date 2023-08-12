import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import sqlite from "sqlite3";

const server = createServer();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**middleware**/
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "./client")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);

server.listen(3000, () => console.log("ws running on 3000"));

process.on("SIGINT", () => {
  ws_server.clients.forEach((c) => c.close());
  server.close(() => {
    console.log("server is closing");
    shutdb();
  });
});

/*web sockets*/
const ws_server = new WebSocketServer({ server });
ws_server.on("connection", (ws) => {
  console.log("clients connected: ", ws_server.clients.size);
  ws_server.broadcast(`current visitors ${ws_server.clients.size}`);
  if (ws.readyState == ws.OPEN) {
    ws.send("hello there");
    db.run(
      `insert into visitors (date,count) values (datetime('now'),${ws_server.clients.size})`,
    );
  }
  ws.on("close", (ws) => {
    console.log("a client has disconnected");
  });
  ws.onmessage = (e) => console.log(e.data);
});

ws_server.broadcast = (data) => {
  ws_server.clients.forEach((client) => client.send(data));
};
/** data base **/
const db = new sqlite.Database("./fsfe.db");
db.serialize(() => {
  db.run(
    "CREATE TABLE if Not exists visitors (id INTEGER PRIMARY KEY AUTOINCREMENT ,date TEXT,count INTEGER)",
  );
});

const getcounts = () => {
  db.each("select * from visitors", (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
};

//a function to shutdown the db
const shutdb = () => {
  console.log("closing db connection");
  getcounts();
  db.close((err) => (err ? console.log(err) : console.log("ok")));
};
