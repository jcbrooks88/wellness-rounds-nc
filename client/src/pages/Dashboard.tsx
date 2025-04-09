import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DiscussionForm from "../components/discussions/DiscussionForm";
import "../App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleNewDiscussion = (newDiscussion: any) => {
    // you may want to add this to a discussion list in the future
    console.log("New Discussion Created:", newDiscussion);
    setShowForm(false); // close modal after submission
  };

  const handleNavigateToDiscussion = () => {
    navigate("/discussion");
  };

  return (
    <div>
      <h1>What Space are you In?</h1>

    <div className="button-group">
      <button className="safe-space-button" onClick={() => setShowForm(true)}>
        Create a Safe Space
      </button>

      <button className="safe-space-button" onClick={handleNavigateToDiscussion}>
        Find a Safe Space
      </button>
    </div>


      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <DiscussionForm onDiscussionCreated={handleNewDiscussion} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
