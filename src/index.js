// index.js
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { deleteItem, getItemById, getItems, postItem, putItem } from './items.mjs';
import { getUsers, getUserById, postUser, postLogin, putUser } from './users.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/sivusto', express.static(path.join(__dirname, '../public')));

app.get('/items', getItems);

app.get('/items/:id', getItemById);

//itemin lisäys POST http://127.0.0.1:3000/items/
app.post('/items', postItem);
//Lisäys
app.put('/items/:id', putItem);
//Poistaminen
app.delete('/items/:id', deleteItem);


//users resource
//list of users
app.get('/users', getUsers);
//get info users
app.get('/users/:id', getUserById);
//create new user
app.post('/users', postUser);
//check rigt users username and password
app.post('/users/:id', postLogin);
//user information update
app.put('users/:id', putUser);



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
