import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { graphqlRequest } from "../utils/api";
import { GET_DISCUSSION_BY_ID } from "../graphql/queries/graphql";
import "../App.css";


export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [discussion, setDiscussion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const data = await graphqlRequest(GET_DISCUSSION_BY_ID, { id }, undefined, {});
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

  if (loading) return <p className="loading">Loading discussion...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!discussion) return <p className="not-found">Discussion not found.</p>;

  return (
    <div className="discussion-container">
      <div className="discussion-header">
        <div>
          <h1 className="discussion-title">{discussion.title}</h1>
          <p className="author-info">
            By <strong>{discussion.author.username}</strong> &bull;{" "}
            {new Date(discussion.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="discussion-content">
        <p>{discussion.content}</p>
      </div>
      <div className="discussion-tags">
        {discussion.keywords.map((tag: string) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
