import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlRequest } from "../../utils/api";
import { SEARCH_DISCUSSIONS_QUERY } from "../../graphql/queries/graphql";
import "../../App.css";

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

        const data = await graphqlRequest(
          SEARCH_DISCUSSIONS_QUERY,
          {
            title: query,
            keywords: matchedKeywords,
          },
          undefined,
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        );

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
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by keyword (Burnout, Mental Health, etc.) or title..."
        value={query}
        onChange={handleInputChange}
      />

      {filteredKeywords.length > 0 && (
        <ul className="keyword-list">
          {filteredKeywords.map((keyword) => (
            <li
              key={keyword}
              className="keyword-pill"
              onClick={() => handleKeywordClick(keyword)}
            >
              {highlightMatch(keyword)}
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="search-loading">Loading...</p>}
      {error && <p className="search-error">{error}</p>}

      {results.length > 0 && (
        <div className="search-results">
          {results.map((discussion) => (
            <div
              key={discussion._id}
              className="search-result-card"
              onClick={() => handleResultClick(discussion._id)}
            >
              <h3>{highlightMatch(discussion.title)}</h3>
              <p className="search-author">By {discussion.author?.username ?? "Unknown"}</p>
              <p>{highlightMatch(discussion.content.slice(0, 60))}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
