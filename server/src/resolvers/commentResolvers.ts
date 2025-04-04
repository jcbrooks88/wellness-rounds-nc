import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

const commentResolvers = {
    Mutation: {
      addComment: async (_: any, { postId, content, author }: { postId: string; content: string; author: string }) => {
        const comment = new Comment({ content, author, post: postId });
        await comment.save();
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
        return comment;
      },
    },
  };
  
  export default commentResolvers;