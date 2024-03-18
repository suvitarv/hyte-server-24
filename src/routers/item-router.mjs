import express from 'express';
import { deleteItem, getItemById, getItems, postItem, putItem } from '../controllers/item-controller.mjs';


const itemRouter = express.Router();

//define routers here



itemRouter.get('/', getItems);

itemRouter.get('/:id', getItemById);

//itemin lisäys POST http://127.0.0.1:3000/items/
itemRouter.post('/', postItem);
//Lisäys
itemRouter.put('/:id', putItem);
//Poistaminen
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
