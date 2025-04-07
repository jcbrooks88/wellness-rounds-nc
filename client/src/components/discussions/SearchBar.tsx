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
    if (!query) {
      setResults([]);
      onResults?.([]);
      return;
    }

    const delaySearch = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        // Match input to known keywords (case-insensitive)
        const matchedKeywords = keywordOptions.filter((k) =>
          k.toLowerCase().includes(query.toLowerCase())
        );

        const data = await graphqlRequest(SEARCH_DISCUSSIONS_QUERY, {
          title: query, // still enables partial title match
          keywords: matchedKeywords, // dynamic keyword filtering
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
    <div style={{ padding: "1rem" }}>
      <input
        type="text"
        placeholder="Search by keyword or title..."
        value={query}
        onChange={handleInputChange}
        style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredKeywords.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredKeywords.map((keyword) => (
            <li
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              style={{
                display: "inline-block",
                margin: "5px",
                padding: "8px 12px",
                backgroundColor: "#eee",
                borderRadius: "16px",
                cursor: "pointer"
              }}
            >
              {keyword}
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          {results.map((discussion) => (
            <div
              key={discussion._id}
              onClick={() => handleResultClick(discussion._id)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                cursor: "pointer",
                width: "200px"
              }}
            >
              <h3>{discussion.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#666" }}>
                By {discussion.author?.username ?? "Unknown"}
              </p>
              <p>{discussion.content.slice(0, 60)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
