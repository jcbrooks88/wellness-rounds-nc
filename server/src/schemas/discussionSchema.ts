import { gql } from "apollo-server-express";

const discussionTypeDefs = gql`
  type Discussion {
    _id: ID!
    title: String!
    content: String!
    keywords: [String]
    author: User
  }

extend type Query {
  discussions: [Discussion]
  searchDiscussions(title: String!, keywords: [String]!): [Discussion]
}


  extend type Mutation {
    createDiscussion(title: String!, content: String!, keywords: [String]!): Discussion
    searchDiscussions(title: String!, keywords: [String]!): Discussion
  }
`;

export default discussionTypeDefs;
