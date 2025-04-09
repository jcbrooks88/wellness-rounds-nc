import React from "react";

interface SearchResultsProps {
  results: any[];
}

const SearchResultsList: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return <p style={{ padding: "0rem", fontSize: "5rem", margin: "1%" }}>🔍</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Results</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
      {results.map((discussion) => (
        <li
            key={discussion.id ?? `${discussion.title}-${Math.random()}`} // fallback just in case
            style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
    }}
  >
    <h3>{discussion.title}</h3>
    <p style={{ color: "#555" }}>
      <strong>By:</strong> {discussion.author?.username} &nbsp;|&nbsp;
      <em>{new Date(discussion.createdAt).toLocaleString()}</em>
    </p>
    <p>{discussion.content.slice(0, 150)}...</p>
  </li>
))}

      </ul>
    </div>
  );
};

export default SearchResultsList;
