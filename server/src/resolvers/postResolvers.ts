import Post from '../models/Post';
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
      { title, content, authorId }: { title: string; content: string; authorId: string }
    ) => {
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        throw new Error('Invalid authorId');
      }

      const newPost = new Post({
        title,
        content,
        author: new mongoose.Types.ObjectId(authorId),
      });

      await newPost.save();
      return newPost.populate('author');
    },

    deletePost: async (_: any, { postId }: { postId: string }) => {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      const deletedPost = await Post.findByIdAndDelete(postId);
      return deletedPost;
    },
  },
};

export default postResolvers;
