import express from 'express';
import validateResourse from '../middleware/validateResource';
import controller from '../feactures/notebook/notebook.controller';
import {
  idNotebookSchema,
  notebookSchema,
  searchNotebookSchema,
} from '../feactures/notebook/notebook.schemas';

const router = express.Router();

router.post('/', validateResourse(notebookSchema), controller.createNoteBook);
router.get(
  '/search',
  validateResourse(searchNotebookSchema),
  controller.searchNoteBook
);
router.get('/', controller.getAllNoteBook);
router.get(
  '/:id',
  validateResourse(idNotebookSchema),
  controller.getNoteBookById
);
router.put('/:id', validateResourse(notebookSchema), controller.updateNoteBook);
router.delete(
  '/:id',
  validateResourse(idNotebookSchema),
  controller.deleteNoteBook
);

export default router;
