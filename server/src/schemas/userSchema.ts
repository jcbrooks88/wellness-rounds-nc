import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    posts: [Post]
    comments: [Comment]
    discussions: [Discussion]
    about: String
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type Discussion {
    _id: ID!
    title: String!
    content: String!
    author: User!
    keywords: [String]
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getAllPosts: [Post!]!
    getPostById(postId: ID!): Post
    user(id: ID!): User
    users: [User]
    me: User
    discussions: [Discussion]
    searchDiscussions(title: String!, keywords: [String]!): [Discussion]
    getCommentsByPost(postId: ID!): [Comment!]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(email: String!, password: String!): AuthPayload!
    addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): AuthPayload!
    createPost(title: String!, content: String!): Post!
    deletePost(postId: ID!): Post
    addComment(postId: ID!, content: String!): Comment!
    createDiscussion(title: String!, content: String!, keywords: [String]!): Discussion
    updateAbout(about: String!): User
  }
`;

export default userTypeDefs;
