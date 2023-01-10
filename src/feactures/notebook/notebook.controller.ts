import { NextFunction, Request, Response } from 'express';
import Notebook from './notebook.model';

const createNoteBook = (req: Request, res: Response, _next: NextFunction) => {
  const data = req.body;
  const notebook = new Notebook({ ...data });

  notebook
    .save()
    .then((dataSave) => {
      res.status(201).json(dataSave);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const updateNoteBook = (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  return Notebook.findById(id)
    .then((notebook) => {
      if (notebook) {
        notebook.set({ ...req.body });

        return notebook
          .save()
          .then((dataSave) => res.status(201).json(dataSave))
          .catch((error) => res.status(500).json({ error }));
      } else res.status(404).json({ message: 'Notebbook not found' });
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteNoteBook = (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  return Notebook.findByIdAndDelete(id)
    .then((notebook) =>
      notebook
        ? res.status(201).json({ message: 'Notebook deleted' })
        : res.status(404).json({ message: 'Notebbok not found.' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const searchNoteBook = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const title = req.query.title;
    const body = req.query.body;
    let query;

    if (title)
      query = {
        title: { $regex: title, $options: 'i' },
      };
    else
      query = {
        body: { $regex: body, $options: 'i' },
      };

    const response = await Notebook.find(query);

    return response
      ? res.status(200).json({ notebook: response })
      : res.status(404).json({ message: 'Notebook not found' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getNoteBookById = (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  return Notebook.findById(id)
    .then((notebook) => {
      return notebook
        ? res.status(200).json(notebook)
        : res.status(404).json({ message: 'Notebook not found' });
    })
    .catch((error) => res.status(500).json({ error }));
};

const getAllNoteBook = (req: Request, res: Response, _next: NextFunction) => {
  const page: number = Number(req.query.page) || 0;
  const limit: number = Number(req.query.limit) || 10;

  return Notebook.find()
    .limit(limit)
    .skip(page)
    .then((notebook) => res.status(200).json({ notebook }))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createNoteBook,
  updateNoteBook,
  deleteNoteBook,
  searchNoteBook,
  getNoteBookById,
  getAllNoteBook,
};
