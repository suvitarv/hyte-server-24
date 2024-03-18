import express from 'express';
import {body} from 'express-validator';
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
.post(body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
body('password').trim().isLength({min: 8, max: 128}),
body('email').trim().isEmail(),
postUser);

userRouter.route('/:id')
.get(authenticateToken, getUserById)

.delete(authenticateToken, deleteUser);


export default userRouter;


