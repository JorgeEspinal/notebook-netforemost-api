import mongoose, { Document, Schema } from 'mongoose';

interface INotebook extends Document {
  title: string;
  body: string;
  date: Date;
}

const NotebookSchema = new Schema<INotebook>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<INotebook>('Notebook', NotebookSchema);
