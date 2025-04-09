import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query {
    me {
      _id
      username
      email
      firstName
      lastName
      about
      workHistory {
        position
        company
        startDate
        endDate
        description
      }

      comments {
        _id
        content
        createdAt
        post {
          _id
          title
        }
      }
        
      discussions {
        _id
        title
        content
        createdAt
        keywords
      }
    }
  }
`;

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

export const GET_DISCUSSIONS_QUERY = gql`
  query {
    discussions {
      _id
      title
      content
      keywords
      author {
          _id
          firstName
          lastName
      }
    }
  }
`;
export const GET_DISCUSSION_BY_ID = gql`
  query GetDiscussion($id: ID!) {
    getDiscussion(id: $id) {
      _id
      title
      content
      keywords
      createdAt
      author {
        _id
        username
      }
    }
  }
`;

export const SEARCH_DISCUSSIONS_QUERY = gql`
  query SearchDiscussions($title: String!, $keywords: [String]!) {
    searchDiscussions(title: $title, keywords: $keywords) {
      _id
      title
      content
      keywords
      author {
          _id
          firstName
          lastName
      }
    }
  }
`;