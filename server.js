import express from "express";

const app = express();
app.get('/', (_, res) => {
  res.status(200).send("<h1>THIS IS A DEMO</h1>");
});
app.listen(3000);
console.log('app is listening on 3000');

