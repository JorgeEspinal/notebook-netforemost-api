import z, { TypeOf } from 'zod';

export const notebookSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    body: z.string({ required_error: 'Body is required' }),
    date: z.string({
      required_error: 'Date is required',
    }),
  }),
});

export const idNotebookSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Id is required' }),
  }),
});

export const searchNotebookSchema = z.object({
  query: z
    .object({
      title: z.string().min(1).optional(),
      body: z.string().min(1).optional(),
    })
    .refine((data) => data.title || data.body, {
      message: 'Set "title" or "body" property to search',
    }),
});

export type CreateNotebookInput = TypeOf<typeof notebookSchema>['body'];
export type DeleteNotebookInput = TypeOf<typeof idNotebookSchema>['params'];
export type SearchNotebookInput = TypeOf<typeof searchNotebookSchema>['query'];
