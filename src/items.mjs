const items = [
    {id: 1, name: 'item1'},
    {id: 2, name: 'item2'},
    {id: 3, name: 'item kolme'},
    {id: 4, name: 'item neljä'},
];

const getItems = (req, res) => {
    res.json(items);
};

const getItemById = (req, res) => {
    console.log('request item id', req.params.id);
    let item = items.find(item => item.id === parseInt(req.params.id));
    if (item) {
      res.json(item.name);
    } else {
      res.status(404).json({error: '404 not found'});
    }
};

const postItem = (req, res) => {
    console.log('postItem request body', req.body);
    if (!req.body.name) {
        return res.status(400).json({error: 'item name missing'});
    }
    //new id: add 1 to last id number in the items array
    const newId = items[items.length-1].id +1
    const newItem = {id: newId, name: req.body.name};
    items.push(newItem);
    res.status(201).json({message: 'item created'});
};

const deleteItem = (req, res) => {
    //TODO: implement delete item
    //tip: array.findIndex
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) {
        //example how to send only the status code (still valid http response)
        return res.sendStatus(404);
    }
    const deletedItems = items.splice(index, 1);
    console.log('deleteItem:', deletedItems);
    res.json({deleted_item: deletedItems[0]});
    res.sendStatus(204);
};

const putItem = (req, res) => {
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) {
        //example how to send only the status code (still valid http response)
        return res.sendStatus(404);
    }
    if (!req.body.name) {
        return res.status(400).json({error: 'item name missing'});
    }
    items[index].name = req.body.name;
    res.json({updated_item: items[index]});
    res.json({message: 'put placeholder'});
};

export {getItems, getItemById, postItem, deleteItem, putItem};


