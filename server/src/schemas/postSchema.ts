import { gql } from 'apollo-server-express';

const postTypeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getAllPosts: [Post!]!
    getPostById(postId: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!, authorId: ID!): Post!
    deletePost(postId: ID!): Post
  }
`;

export default postTypeDefs;
