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
    res.json({message: 'item created'});
};

const deleteItem = (req, res) => {
    //TODO: implement delete item
    //tip: array.findIndex
    res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
    res.json({message: 'put placeholder'});
};

export {getItems, getItemById, postItem, deleteItem, putItem};


