import UserProfile from "../components/profile/UserProfile";
import CreatePostForm from "../components/timeline/CreatePostForm";
import Timeline from "../components/timeline/Timeline";

const ProfilePage = () => {
    return (
    <>
      <h1>My Profile</h1>
      <div className="login-page-container">
        <UserProfile />
      </div>
      <div className="timeline-page">
      <h2>My Timeline</h2>
        <>
          <CreatePostForm />
          <Timeline />
        </>
     
    </div>
    </>
  );
  };
  
  export default ProfilePage;
  