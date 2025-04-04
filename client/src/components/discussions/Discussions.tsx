import React from "react";

interface Discussion {
  _id: string;
  title: string;
  content: string;
  keywords: string[];
  author: {
    username: string;
  };
}

interface DiscussionsProps {
  discussions: Discussion[];
}

const Discussions: React.FC<DiscussionsProps> = ({ discussions }) => {
  if (discussions.length === 0) {
    return <p>No discussions yet. Be the first to start one!</p>;
  }

  return (
    <div>
      {discussions.map((discussion) => (
        <div key={discussion._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h2>{discussion.title}</h2>
          <p>{discussion.content}</p>
          <p><strong>Keywords:</strong> {discussion.keywords.join(", ")}</p>
          <p><strong>Posted by:</strong> {discussion.author?.username ?? "Anonymous"}</p>
        </div>
      ))}
    </div>
  );
};

export default Discussions;
