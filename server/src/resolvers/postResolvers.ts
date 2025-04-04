import { Post } from '../models/Post';

const postResolvers = {
    Query: {
        searchPosts: async (_: any, { keywords }: { keywords: string[] }) => {
          return await Post.find({ keywords: { $in: keywords } }).populate("author");
        },
      },
      
  Mutation: {
    createPost: async (_: any, { title, content, author }: { title: string; content: string; author: string }) => {
      const newPost = new Post({ title, content, author });
      return await newPost.save();
    },
    deletePost: async (_: any, { id }: { id: string }) => {
      await Post.findByIdAndDelete(id);
      return "Post deleted";
    },
  },
};

export default postResolvers;
