import User, { IUser } from "../models/User.js";
import { signToken } from "../middleware/auth.js";
import { AuthenticationError } from "apollo-server-express";

const resolvers = {
  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user: IUser | null = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id as string,
      });
      return { token, user };
    },
  },
};

export default resolvers;
