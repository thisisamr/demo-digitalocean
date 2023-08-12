import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static assets from the "public" and "asd" directories
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, 'client')));


// Send the HTML file
app.get('/', (_, res) => {
  const htmlPath = path.join(__dirname, 'index.html');
  res.sendFile(htmlPath);
});

app.listen(3000, () => {
  console.log('app is listening on 3000');
});
