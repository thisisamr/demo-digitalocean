import express from "express";

const app = express();
app.get('/', (_, res) => {
  res.status(200).send("<body style='color:black;'><h1 style ='color:white;'>THIS IS A DEMO</h1><body>");
});
app.listen(3000);
console.log('app is listening on 3000');

