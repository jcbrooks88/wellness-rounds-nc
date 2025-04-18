import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  type Post {
    _id: ID!
    content: String!
    username: String!
    author: User!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getAllPosts: [Post!]!
    getPostById(postId: ID!): Post
  }

  extend type Mutation {
    createPost(content: String!, username: String!): Post!
    deletePost(postId: ID!): Post
  }
`;
