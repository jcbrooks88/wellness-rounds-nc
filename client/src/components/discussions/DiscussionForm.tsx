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
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (title.trim() === "" || content.trim() === "") {
      setError("Title and content are required.");
      return;
    }

    if (selectedKeywords.length === 0) {
      setError("Please select at least one keyword.");
      return;
    }

    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const data = await graphqlRequest(CREATE_DISCUSSION_MUTATION, { title, content, keywords: selectedKeywords }, headers);
      onDiscussionCreated(data.createDiscussion);
      setTitle("");
      setContent("");
      setSelectedKeywords([]);
      setSuccess("Discussion created successfully!");
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
      <h2>Create a Discussion</h2>
      <input type="text" placeholder="Discussion Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
      <textarea placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} style={textareaStyle} />
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
      {success && <p style={successStyle}>{success}</p>}
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
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: "120px",
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
  backgroundColor: "#e6e6e6",
  padding: "5px 10px",
  borderRadius: "16px",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
};

const successStyle: React.CSSProperties = {
  color: "green",
  fontSize: "14px",
};
