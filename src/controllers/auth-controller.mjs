import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.mjs';

const postLogin = async (req, res) => {
  const {username, password} = req.body;
  console.log('login', req.body);
  const user = await selectUserByUsername(username);
  if (user.error) {
    return res.status(user.error).json(user);
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
    return res.json({message: 'logged in succesfully', user, token});
  } else {
    return res
      .status(404)
      .json({error: 401, message: 'Invalid username or password'});
  }
};

const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};
