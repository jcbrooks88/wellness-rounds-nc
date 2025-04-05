import Discussion from "../models/Discussion.js";
import { GraphQLError } from "graphql";

const discussionResolvers = {
  Query: {
    discussions: async () => await Discussion.find().populate("author"),
    searchDiscussions: async (_: any, { title, keywords }: any) => {
      return await Discussion.find({
        title: { $regex: title, $options: "i" },
        keywords: { $in: keywords },
      }).populate("author");
    },    
  },
  Mutation: {
    createDiscussion: async (_: any, { title, content, keywords }: any, { user }: any) => {
      if (!user) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } } as any);

      const newDiscussion = new Discussion({ title, content, keywords, author: user._id });
      await newDiscussion.save();
      return newDiscussion.populate("author");
    },
  },
};

export default discussionResolvers;
