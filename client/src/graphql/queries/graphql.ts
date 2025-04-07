import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      title
      content
      createdAt
      author {
        _id
        firstName
        lastName
      }
      comments {
        _id
        content
        createdAt
        author {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;


