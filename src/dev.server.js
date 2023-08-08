import express from "express";

const app = express();
app.get('/', (_, res) => {
  res.status(200).send("<body style='background-color:black;'><h1 style ='color:white;'>THIS IS THE DEV SERVER</h1><body>");
});
app.listen(5000);
console.log('app is listening on 3000');

