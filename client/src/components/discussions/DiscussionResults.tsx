import { useLocation } from "react-router-dom";

export default function DiscussionResults() {
  const location = useLocation();
  const discussion = location.state;

  if (!discussion) {
    return <p>No discussion selected.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{discussion.title}</h1>
      <p><strong>By:</strong> {discussion.author.username}</p>
      <hr />
      <p>{discussion.content}</p>
    </div>
  );
}
