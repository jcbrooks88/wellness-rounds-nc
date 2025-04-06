import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: ID!) {
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
