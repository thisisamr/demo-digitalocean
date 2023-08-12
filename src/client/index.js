const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${protocol}://${window.location.host}`);
ws.onerror = (e) => {
  console.log(e);
};
ws.onmessage = (e) => console.log(e.data);
setTimeout(() => {
  console.log("4 seconds have passed");
  ws.send("closing 🤣🤣🤣🤣🤣 ");
  ws.close();
}, 4000);
