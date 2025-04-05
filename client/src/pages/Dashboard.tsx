import DiscussionForm from "../components/discussions/DiscussionForm";

const Dashboard = () => {
  const handleNewDiscussion = (newDiscussion: any) => {
    newDiscussion((prev: any) => [newDiscussion, ...prev]); // Update state with new discussion
  };

  return (
      <div>
          <h1>Ready to Create a Community?</h1>
          <DiscussionForm onDiscussionCreated={handleNewDiscussion} />
      </div>
  );
};

export default Dashboard;