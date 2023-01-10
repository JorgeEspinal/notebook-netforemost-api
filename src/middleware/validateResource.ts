import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateResourse =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e) {
      return res.status(400).json(e);
    }
  };

export default validateResourse;
