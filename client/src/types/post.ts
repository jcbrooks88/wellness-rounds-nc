export interface Post {
    _id: string;
    title: string;
    content: string;
    comments?: Comment[];
    author: { username: string };
    keywords: string[];
  }
  