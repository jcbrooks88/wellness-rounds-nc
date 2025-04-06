import mongoose, { Schema, Types, Document } from 'mongoose';


export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // ✅ Match the type
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post; // ✅ Use default export
