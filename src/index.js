// index.js
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import itemRouter from './routers/item-router.mjs';
import userRouter from './routers/user-router.mjs';
import entryRouter from './routers/entry-router.mjs';
import logger from './middlewares/logger.mjs';
import authRouter from './routers/auth-router.mjs';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();


app.use(cors());

app.use(logger);

app.use(express.json());

app.use(express.static('public'));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/sivusto', express.static(path.join(__dirname, '../public')));


app.use('/items', itemRouter);
app.use('/api/users', userRouter);

//users resource
app.use('/api/entries', entryRouter);

//user authentication
app.use('/api/auth', authRouter);


//default 404 note found
app.use(notFoundHandler);

//Error handler for all errors
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Welcome to my rest API');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
