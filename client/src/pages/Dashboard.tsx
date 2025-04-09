import { useNavigate } from "react-router-dom";
import DiscussionForm from "../components/discussions/DiscussionForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNewDiscussion = (newDiscussion: any) => {
    newDiscussion((prev: any) => [newDiscussion, ...prev]); // Update state with new discussion
  };

  const handleNavigateToDiscussion = () => {
    navigate("/discussion");
  };

  return (
    <div>
      <h1>What's on Your Mind?</h1>
      <button 
        onClick={handleNavigateToDiscussion}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Find a Safe Space
      </button>
      <DiscussionForm onDiscussionCreated={handleNewDiscussion} />
    </div>
  );
};

export default Dashboard;
