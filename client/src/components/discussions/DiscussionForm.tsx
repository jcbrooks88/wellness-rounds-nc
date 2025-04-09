import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { graphqlRequest } from "../../utils/api";
import { CREATE_DISCUSSION_MUTATION } from "../../graphql/mutations/mutations";
import "../../App.css";

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
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Create a Safe Space</h2>
      <input type="text" placeholder="Topic..." value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      <textarea placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} className="textarea" />
      <div className="keywords-container">
        <p>Select Keywords:</p>
        {keywordOptions.map((keyword) => (
          <label key={keyword} className="keyword-label">
            <input type="checkbox" checked={selectedKeywords.includes(keyword)} onChange={() => toggleKeyword(keyword)} />
            {keyword}
          </label>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button type="submit" disabled={loading} className="button">
        {loading ? "Creating..." : "Create Discussion"}
      </button>
    </form>
  );
}
