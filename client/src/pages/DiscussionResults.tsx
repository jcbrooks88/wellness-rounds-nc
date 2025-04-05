import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { graphqlRequest } from "../utils/api";
import { gql } from "@apollo/client";

const GET_DISCUSSION_QUERY = gql`
  query getDiscussion($id: ID!) {
    getDiscussion(id: $id) {
      title
      content
      author {
        username
      }
      createdAt
    }
  }
`;

export default function DiscussionResults() {
  const { id } = useParams<{ id: string }>();
  const [discussion, setDiscussion] = useState<any>(null);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const data = await graphqlRequest(GET_DISCUSSION_QUERY, { id });
        setDiscussion(data.getDiscussion);
      } catch (err) {
        console.error("Error fetching discussion:", err);
      }
    };
    fetchDiscussion();
  }, [id]);

  if (!discussion) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{discussion.title}</h2>
      <p><strong>By:</strong> {discussion.author.username}</p>
      <p><em>{new Date(discussion.createdAt).toLocaleString()}</em></p>
      <div style={{ marginTop: "1rem" }}>{discussion.content}</div>
    </div>
  );
}
