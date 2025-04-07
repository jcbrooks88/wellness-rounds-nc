import { User } from "../models/User.js";
import { signToken } from "../middleware/authMiddleware.js";
import { AuthenticationError } from "apollo-server-express";
import { Comment } from "../models/Comment.js";
import Discussion from "../models/Discussion.js";

interface IUser {
  _id: string;
  username: string;
  email: string;
  isCorrectPassword?: (password: string) => Promise<boolean>;
}

const userResolvers = {
  Query: {
    user: async (_: any, __: any, context: any) => {
      if (!context.user) throw new AuthenticationError("You must be logged in.");
  
      const user: IUser | null = await User.findById(context.user._id).select("_id username email");
      if (!user) throw new Error("User not found.");
  
      return user;
    },
  
    me: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in.");
      }
  
      const user = await User.findById(context.user._id).lean();
      if (!user) {
        throw new Error("User not found.");
      }
  
      // Populate related content
      const comments = await Comment.find({ author: user._id }).populate("post", "_id title").lean();
      const discussions = await Discussion.find({ author: user._id }).lean();
  
      return {
        ...user,
        comments,
        discussions,
      };
    },
  },
  
  Mutation: {
    addUser: async (
      _: any,
      { username, email, password, firstName, lastName }: any
    ) => {
      const user = await User.create({ username, email, password, firstName, lastName }); // ✅ send the actual fields
    
      const token = signToken({
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
      });
    
      return { token, user };
    },

    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user: IUser | null = await User.findOne({ email });
      if (!user || !user.isCorrectPassword || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken({ _id: (user._id as unknown as string).toString(), username: user.username, email: user.email });
      return { token, user };
    },
  },
};

export default userResolvers;
