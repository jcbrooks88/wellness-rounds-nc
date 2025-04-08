import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlRequest } from "../../utils/api";
import { SEARCH_DISCUSSIONS_QUERY } from "../../graphql/queries/graphql";

const keywordOptions = [
  "Mental Health",
  "Burnout",
  "Career Change",
  "Self-Care",
  "Therapy",
  "Wellness",
  "Support"
];

interface SearchBarProps {
  onResults?: (results: any[]) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      onResults?.([]);
      return;
    }

    const delaySearch = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const matchedKeywords = keywordOptions.filter((k) =>
          k.toLowerCase().includes(query.toLowerCase())
        );

        const data = await graphqlRequest(SEARCH_DISCUSSIONS_QUERY, {
          title: query,
          keywords: matchedKeywords,
        });

        setResults(data.searchDiscussions);
        onResults?.(data.searchDiscussions);
      } catch (err) {
        console.error("Search error:", err);
        setError("Error fetching search results.");
        onResults?.([]);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const highlightMatch = (text: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredKeywords(
      value
        ? keywordOptions.filter((k) =>
            k.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setFilteredKeywords([]);
  };

  const handleResultClick = (discussionId: string) => {
    navigate(`/discussions/${discussionId}`);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <input
        type="text"
        placeholder="Search by keyword or title..."
        value={query}
        onChange={handleInputChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {filteredKeywords.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
          {filteredKeywords.map((keyword) => (
            <li
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              style={{
                display: "inline-block",
                margin: "5px",
                padding: "6px 12px",
                backgroundColor: "#f0f0f0",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {highlightMatch(keyword)}
            </li>
          ))}
        </ul>
      )}

      {loading && <p style={{ marginTop: "10px" }}>Loading...</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {results.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {results.map((discussion) => (
            <div
              key={discussion._id}
              onClick={() => handleResultClick(discussion._id)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                cursor: "pointer",
                width: "100%",
                maxWidth: "260px",
                backgroundColor: "#fafafa",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              <h3 style={{ marginBottom: "0.5rem" }}>
                {highlightMatch(discussion.title)}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#555" }}>
                By {discussion.author?.username ?? "Unknown"}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#333" }}>
                {highlightMatch(discussion.content.slice(0, 60))}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
