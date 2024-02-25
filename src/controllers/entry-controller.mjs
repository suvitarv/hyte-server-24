import {listAllEntries, findEntryById, addEntry, deleteEntryById, updateEntryById, listAllEntriesById} from "../models/entry-model.mjs";

const getEntries = async (req, res) => {
  const result = await listAllEntriesById(req.user.user_id);
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

const postEntry = async (req, res) => {
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  const user_id = req.user.user_id;
  console.log(req.user);
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry({user_id, entry_date, mood, weight, sleep_hours, notes});
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const entry_id = req.params.id;
  const user_id = req.user.user_id;
  const {entry_date, mood, weight, sleep_hours, notes} = req.body;
  // check that all needed fields are included in request
  if ((entry_date || weight || mood || sleep_hours || notes) && entry_id) {

    const entry = await findEntryById(entry_id)
    if (entry[0].user_id != user_id) {
      return res.status(401).json({error:401, message: "User prohibited"})
    }

    const result = await updateEntryById({entry_id, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }

};

const deleteEntry = async (req, res) => {
  const entry_id = req.params.id;
  const user_id = req.user.user_id;
  const entry = await findEntryById(entry_id);
  if (!entry[0]) {
    return res.status(404).json({error: 404, message: "Entry not found"})
  }
    if (entry[0].user_id != user_id) {
      return res.status(401).json({error:401, message: "User prohibited"})
    }
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
