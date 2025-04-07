import { gql } from 'apollo-server-express';

export const commentTypeDefs = gql`
  type Comment {
    _id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getCommentsByPost(postId: ID!): [Comment!]!
  }

  extend type Mutation {
    addComment(postId: ID!, content: String!, authorId: ID!): Comment!
  }
`;
