import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { graphqlRequest } from "../../utils/api";
import { CREATE_DISCUSSION_MUTATION } from "../../graphql/mutations/mutations";


const keywordOptions = ["Mental Health", "Burnout", "Career Change", "Self-Care", "Therapy", "Wellness", "Support"];

interface DiscussionFormProps {
  onDiscussionCreated: (discussion: any) => void;
}

export default function DiscussionForm({ onDiscussionCreated }: DiscussionFormProps) {
  const { token } = useContext(AuthContext)!;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; 
      const data = await graphqlRequest(CREATE_DISCUSSION_MUTATION, { title, content, keywords: selectedKeywords }, headers);
      onDiscussionCreated(data.createDiscussion);
      setTitle("");
      setContent("");
      setSelectedKeywords([]);
    } catch (err) {
      setError("Failed to create discussion. Please try again.");
    }

    setLoading(false);
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input type="text" placeholder="Discussion Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
      <textarea placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} required style={textareaStyle} />
      <div style={keywordsContainer}>
        <p>Select Keywords:</p>
        {keywordOptions.map((keyword) => (
          <label key={keyword} style={keywordLabel}>
            <input type="checkbox" checked={selectedKeywords.includes(keyword)} onChange={() => toggleKeyword(keyword)} />
            {keyword}
          </label>
        ))}
      </div>
      {error && <p style={errorStyle}>{error}</p>}
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Creating..." : "Create Discussion"}
      </button>
    </form>
  );
}
const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "500px",
  margin: "auto",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
};

const textareaStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
  height: "100px",
};

const keywordsContainer: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const keywordLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
};
