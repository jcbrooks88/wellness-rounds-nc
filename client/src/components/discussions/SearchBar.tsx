import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { graphqlRequest } from "../../utils/api";

const SEARCH_DISCUSSIONS_QUERY = `
  query searchDiscussions($keyword: String!) {
    searchDiscussions(keyword: $keyword) {
      title
      content
      author {
        username
      }
    }
  }
`;

const keywordOptions = ["Mental Health", "Burnout", "Career Change", "Self-Care", "Therapy", "Wellness", "Support"];

interface SearchBarProps {
  onResults: (results: any[]) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const { token } = useContext(AuthContext)!;
  const [query, setQuery] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const delaySearch = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; 
        const data = await graphqlRequest(SEARCH_DISCUSSIONS_QUERY, { keyword: query }, headers);
        onResults(data.searchDiscussions);
      } catch (err) {
        setError("Error fetching search results.");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query, onResults, token]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredKeywords(
      value ? keywordOptions.filter((k) => k.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setFilteredKeywords([]);
  };

  return (
    <div style={containerStyle}>
      <input type="text" placeholder="Search by keyword..." value={query} onChange={handleInputChange} style={inputStyle} />
      {loading && <p style={loadingStyle}>Loading...</p>}
      {error && <p style={errorStyle}>{error}</p>}
      {filteredKeywords.length > 0 && (
        <ul style={dropdownStyle}>
          {filteredKeywords.map((keyword) => (
            <li key={keyword} onClick={() => handleKeywordClick(keyword)} style={keywordStyle}>
              {keyword}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
};

const dropdownStyle: React.CSSProperties = {
  listStyle: "none",
  padding: "0",
  background: "#fff",
  border: "1px solid #ddd",
  position: "absolute",
  width: "100%",
  zIndex: 1000,
};

const keywordStyle: React.CSSProperties = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #ddd",
};

const loadingStyle: React.CSSProperties = {
  color: "blue",
  fontSize: "14px",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
};
