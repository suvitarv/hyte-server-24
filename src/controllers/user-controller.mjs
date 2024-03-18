import {validationResult} from 'express-validator';
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';
import bcrypt from 'bcryptjs';

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  const validationErrors = validationResult(req);
  console.log('validation error', validationErrors);
  if (validationErrors.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser(
      {username, email, password: hashedPassword},
      next
    );
    return res.status(201).json(result);
  } else {
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};

const putUser = async (req, res) => {
  const user_id = req.user.user_id;

  const user = await selectUserById(user_id);
  if (user.user_id != user_id) {
    return res.status(401).json({error: 401, message: 'User prohibited'});
  }
  const {username, password, email} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user_id && username && password && email) {
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
