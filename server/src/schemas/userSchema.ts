import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    user(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

export default userTypeDefs;
