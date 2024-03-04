import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body, param} from 'express-validator';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)

  .post(
    authenticateToken,
    body('entry_date').trim().isDate().withMessage('Entry date must be a date'),
    body('mood')
      .trim()
      .isLength({min: 3, max: 50})
      .withMessage('Mood has to be between 3 and 50 letters')
      .isAlphanumeric()
      .withMessage('Can be only numbers and letters'),
    body('weight')
      .trim()
      .isFloat({min: 30, max: 200})
      .withMessage('Weight has to be between 30 and 200'),
    body('sleep_hours')
      .trim()
      .isInt({min: 1, max: 12})
      .withMessage('Sleep hours has to be an even number'),
    body('notes')
      .trim()
      .isLength({min: 3, max: 100})
      .withMessage('Text has to be between 3 and 100 letters'),
    postEntry
  );

entryRouter
  .route('/:id')
  .get(authenticateToken, getEntryById)
  .put(
    authenticateToken,
    param('id').trim().isInt(),
    body('entry_date').trim().isDate().withMessage('Entry date must be a date'),
    body('mood')
      .trim()
      .isLength({min: 3, max: 50})
      .withMessage('Mood has to be between 3 and 50 letters')
      .isAlphanumeric()
      .withMessage('Can be only numbers and letters'),
    body('weight')
      .trim()
      .isFloat({min: 30, max: 200})
      .withMessage('Weight has to be between 30 and 200'),
    body('sleep_hours')
      .trim()
      .isInt({min: 1, max: 12})
      .withMessage('Sleep hours has to be an even number'),
    body('notes')
      .trim()
      .isLength({min: 3, max: 100})
      .withMessage('Text has to be between 3 and 100 letters'),

    putEntry
  )
  .delete(authenticateToken, deleteEntry);

export default entryRouter;
