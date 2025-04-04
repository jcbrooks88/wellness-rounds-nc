import mongoose, { Schema, Document } from "mongoose";

export interface IDiscussion extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  keywords: string[];
}

const DiscussionSchema = new Schema<IDiscussion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  keywords: { type: [String], required: true },
});

const Discussion = mongoose.model<IDiscussion>("Discussion", DiscussionSchema);
export default Discussion;
