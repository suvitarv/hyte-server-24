const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];


// Show all users and their information
const getUsers = (req, res) => {
    res.json(users);
};
//
const getUserById = (req, res) => {
    console.log('request user id', req.params.id);
    let user = users.find(user => user.id === parseInt(req.params.id));
    if (user) {
    res.json(user.username);
    } else {
        res.status(404).json({error: '404 not found'});
    }
};

//Create new user
const postUser = (req, res) => {
    const userCreds = req.body;
    if (!userCreds.username || !userCreds.password || !userCreds.email) {
        return res.status(400).json({error: 'Username, password and email missing'});
    };
    const newUserId = users[users.length-1].id + 1
    const newUser = {id: newUserId, username: userCreds.username, password: userCreds.password, email: userCreds.email};
    users.push(newUser);
    res.status(201).json({message: 'New user created'});
};

//user information update
const putUser = (req, res) => {
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    if (index === -1) {
        return res.sendStatus(404);
    }
    const userCreds = req.body
    if (!userCreds.username || !userCreds.password) {
        return res.status(400).json({error: 'username or password missing'});
    }
    users[index].username = userCreds.username;
    users[index].password = userCreds.password;
    users[index].email = userCreds.email;
    res.json({updated_user: users[index]});
};

//dummy login, returns user object id username & password match
const postLogin = (req, res) => {
    const userCreds = req.body;
    if (!userCreds.username || !userCreds.password) {
        return res.sendStatus(400);
    }
    const userFound = users.find(user => user.username == userCreds.username);
    //user not found

    if (userFound.password === userCreds.password) {
        res.json({message: 'logged in succesfully', user: userFound});
    } else {
        return res.status(403).json({error: 'username/password invalid'});
    }
};

export {getUsers, getUserById, postUser, putUser, postLogin};
