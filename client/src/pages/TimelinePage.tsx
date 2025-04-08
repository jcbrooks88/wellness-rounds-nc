import Timeline from '../components/timeline/Timeline';
import CreatePostForm from '../components/timeline/CreatePostForm';
import { useAuth } from '../context/AuthContext';

const TimelinePage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="timeline-page">
      <h1>Welcome to Your Timeline</h1>

      {isAuthenticated && user ? (
        <>
          <CreatePostForm />
          <Timeline />
        </>
      ) : (
        <p>Please log in to view and create posts.</p>
      )}
    </div>
  );
};

export default TimelinePage;
