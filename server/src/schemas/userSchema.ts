// typeDefs.ts or schema.js
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    posts: [Post]
    comments: [Comment]
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    createdAt: String!
  }

type AuthPayload {
  token: String!
  user: User!
}
  
  type Query {
    getAllPosts: [Post!]!
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(email: String!, password: String!): AuthPayload!
    addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): AuthPayload!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
`;

export default typeDefs;
