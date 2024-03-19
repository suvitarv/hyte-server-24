import {
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
} from '../models/entry-model.mjs';
import {validationResult} from 'express-validator';


const getEntries = async (req, res) => {
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res, next) => {
  const errors = validationResult(req);
  const user_id = req.user.user_id;
  if (!errors.isEmpty()) {
    console.log('postEntry errors', errors.array());
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  // combine fields into a new entry object
  const newEntry = {user_id, entry_date, mood, weight, sleep_hours, notes};
  const result = await addEntry(newEntry);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({message: 'New entry added.', ...result});
};



const putEntry = async (req, res) => {
  const entry_id = req.params.id;
  const errors = validationResult(req);
  const user_id = req.user.user_id;
  // check that all needed fields are included in request
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const entry = await findEntryById(entry_id);
  if (entry[0].user_id != user_id) {
    return res.status(401).json({error: 401, message: 'User prohibited'});
  }

  const result = await updateEntryById({entry_id, ...req.body});
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.status(201).json(result);
};

const deleteEntry = async (req, res) => {
  const entry_id = req.params.id;
  const user_id = req.user.user_id;
  const entry = await findEntryById(entry_id);
  if (!entry[0]) {
    return res.status(404).json({error: 404, message: 'Entry not found'});
  }
  if (entry[0].user_id != user_id) {
    return res.status(401).json({error: 401, message: 'User prohibited'});
  }
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
