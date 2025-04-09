import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { graphqlRequest } from "../../utils/api";
import { GET_DISCUSSIONS_QUERY } from "../../graphql/queries/graphql";

export default function SearchResult() {
  const { id } = useParams<{ id: string }>();
  const [discussion, setDiscussion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscussion = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await graphqlRequest(GET_DISCUSSIONS_QUERY, { id }, undefined, {});
        setDiscussion(data.getDiscussion);
      } catch (err) {
        console.error("Error fetching discussion:", err);
        setError("Could not load discussion.");
      } finally {
        setLoading(false);
      }
    };
    fetchDiscussion();
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  if (!discussion) return <p style={{ padding: "2rem" }}>Discussion not found.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem" }}>{discussion.title}</h2>
      <p style={{ color: "#555" }}>
        <strong>By:</strong> {discussion.author.username} &nbsp;|&nbsp;
        <em>{new Date(discussion.createdAt).toLocaleString()}</em>
      </p>
      <hr style={{ margin: "1rem 0" }} />
      <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        {discussion.content}
      </div>
    </div>
  );
}
