import UserProfile from "../components/profile/UserProfile";
import CreatePostForm from "../components/timeline/CreatePostForm";
import Timeline from "../components/timeline/Timeline";

const ProfilePage = () => {
    return (
    <>
    <div className="pages-container">
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
   </div>
    </>
  );
  };
  
  export default ProfilePage;
  