import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $authorId: ID!
  ) {
    createPost(title: $title, content: $content, authorId: $authorId) {
      _id
      title
      content
      author {
        _id
        firstName
        lastName
      }
      createdAt
    }
  }
`;
