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
      $username: String!
  ) {
    createPost(title: $title, content: $content) {
      _id
      title
      content
      username 
      author {
        _id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const CREATE_DISCUSSION_MUTATION = gql`
  mutation CreateDiscussion(
    $title: String!
    $content: String!
    $keywords: [String!]!
  ) {
    createDiscussion(title: $title, content: $content, keywords: $keywords) {
      _id
      title
      content
      keywords
      createdAt
      author {
        _id
        username
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_ABOUT_MUTATION = gql`
  mutation UpdateAbout($about: String!) {
    updateAbout(about: $about) {
      _id
      about
    }
  }
`;