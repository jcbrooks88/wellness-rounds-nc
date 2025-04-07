import { Comment } from '../models/Comment.js';
import Post from '../models/Post.js';
import mongoose from 'mongoose';

const commentResolvers = {
  Mutation: {
    addComment: async (
      _: any,
      { postId, content }: { postId: string; content: string },
      { user }: any // Access user from context
    ) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      const comment = new Comment({
        content,
        author: user._id, // Use user._id from the context
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
