import Post from '../models/Post.js';
import mongoose from 'mongoose';

const postResolvers = {
  Query: {
    getAllPosts: async () => {
      return await Post.find().populate('author').populate({
        path: 'comments',
        populate: { path: 'author' },
      }).sort({ createdAt: -1 });
    },

    getPostById: async (_: any, { postId }: { postId: string }) => {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      return await Post.findById(postId).populate('author').populate({
        path: 'comments',
        populate: { path: 'author' },
      });
    },
  },

  Mutation: {
    createPost: async (
      _: any,
      { content }: { content: string },
      { user }: any // Access user from context
    ) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      const newPost = new Post({
        content,
        username: user.username,
        author: user._id,
      });

      await newPost.save();
      return newPost.populate('author');
    },

    deletePost: async (_: any, { postId }: { postId: string }, { user }: any) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      const deletedPost = await Post.findByIdAndDelete(postId);
      return deletedPost;
    },
  },
};

export default postResolvers;
