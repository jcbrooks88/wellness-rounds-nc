import { Comment } from '../models/Comment.ts';
import Post from '../models/Post.ts';
import mongoose from 'mongoose';


const commentResolvers = {
  Mutation: {
    addComment: async (
      _: any,
      { postId, content, authorId }: { postId: string; content: string; authorId: string }
    ) => {
      if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(authorId)) {
        throw new Error('Invalid postId or authorId');
      }

      const comment = new Comment({
        content,
        author: new mongoose.Types.ObjectId(authorId),
        post: new mongoose.Types.ObjectId(postId),
      });

      await comment.save();

      await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );

      return comment.populate('author');
    },
  },

  Query: {
    getCommentsByPost: async (_: any, { postId }: { postId: string }) => {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      return await Comment.find({ post: postId }).populate('author').sort({ createdAt: -1 });
    },
  },
};

export default commentResolvers;
