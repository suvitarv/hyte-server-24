import express from 'express';
import { getUsers, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

//users resource
//list of users
//user endpoint
userRouter.route('/')
//list users
.get(authenticateToken, getUsers)
// update user
.put(authenticateToken, putUser)
//user registration
.post(postUser);

userRouter.route('/:id')
.get(authenticateToken, getUserById)

.delete(authenticateToken, deleteUser);


export default userRouter;


