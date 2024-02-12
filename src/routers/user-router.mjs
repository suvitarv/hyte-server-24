import express from 'express';
import { getUsers, getUserById, postUser, postLogin, putUser, deleteUser } from '../controllers/user-controller.mjs';

const userRouter = express.Router();

//users resource
//list of users
//user endpoint
userRouter.route('/')
//list users
.get(getUsers)
//user registration
.post(postUser);

userRouter.route('/:id')
.get(getUserById)

.put(putUser)

.delete(deleteUser);


userRouter.post('/login', postLogin);

export default userRouter;


