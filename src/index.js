// index.js
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/sivusto', express.static(path.join(__dirname, '../public')));

const items = [
  {id: 1, name: 'item1'},
  {id: 2, name: 'item2'},
  {id: 3, name: 'item kolme'},
  {id: 4, name: 'item neljä'},
];

app.get('/items/', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  console.log('request item id', req.params.id);
  let item = items.find(item => item.id === parseInt(req.params.id));
  if (item) {
    res.json(item.name);
  } else {
    res.status(404).json({error: '404 not found'});
  }
});

app.get('/items', (req, res) => {
  console.log('request item id', req.params.id);
  let item = 'tähän oikea objekti!'
  res.json(items);
});

//itemin lisäys POST http://127.0.0.1:3000/items/
app.post('/items', (req, res) => {
  res.json({message: 'item created'});
});

app.get('/items', (req, res) => {
  res.json([
    {id: 1, name: 'item1'},
    {id: 2, name: 'item2'},
  ]);
});



app.get('/', (req, res) => {
  res.send('Welcome to my rest API');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
