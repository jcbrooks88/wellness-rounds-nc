import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { graphqlMutation } from "../../utils/api";
import { GET_USER_QUERY } from "../../graphql/queries/graphql";
import { UPDATE_ABOUT_MUTATION } from "../../graphql/mutations/mutations";
import "../../App.css"; 

const Profile: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  // About Me state
  const [aboutText, setAboutText] = useState("");
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const data = await graphqlMutation(GET_USER_QUERY, {}, headers);
        if (data?.me) {
          setUserData(data.me);
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, token]);

  const handleAboutSave = async () => {
    try {
      const variables = { about: aboutText };
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const data = await graphqlMutation(UPDATE_ABOUT_MUTATION, variables, headers); // ✅ use mutation helper
  
      if (data?.updateAbout) {
        setUserData({ ...userData, about: data.updateAbout.about });
        setIsEditingAbout(false);
      }
    } catch (err) {
      console.error("Error saving about section:", err);
    }
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div>
          <h2 className="profile-heading">{userData.username}'s Profile</h2>
          <p className="profile-info">Email: {userData.email}</p>

          {/* About Me Section */}
          <div className="profile-about">
            <h3 className="profile-subheading">About Me</h3>
            {isEditingAbout ? (
              <div className="profile-about-edit">
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="profile-textarea"
                  rows={4}
                />
                <button className="btn-save" onClick={handleAboutSave}>
                  Save
                </button>
              </div>
            ) : (
              <div className="profile-about-view">
                <p>{userData.about || "No about section yet."}</p>
                <button
                  className="btn-edit"
                  onClick={() => {
                    setAboutText(userData.about || "");
                    setIsEditingAbout(true);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="profile-message">No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
