import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { graphqlMutation } from "../../utils/api";
import { GET_USER_QUERY } from "../../graphql/queries/graphql";
import { UPDATE_ABOUT_MUTATION } from "../../graphql/mutations/mutations";
import "../../App.css";

interface Job {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface UserData {
  username: string;
  email: string;
  about?: string;
  workHistory?: Job[];
}

const Profile: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [aboutText, setAboutText] = useState("");
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const data = await graphqlMutation(GET_USER_QUERY, {
          variables: {},
          context: { headers },
        });

        if (data?.me) {
          setUserData(data.me);
        }
      } catch (err: any) {
        console.error("GraphQL fetch error:", err);
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Data:", err.response.data);
        }
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, headers]);

  const handleAboutSave = async () => {
    try {
      const data = await graphqlMutation(UPDATE_ABOUT_MUTATION, {
        variables: { about: aboutText },
        context: { headers },
      });

      if (data?.updateAbout) {
        setUserData((prev) =>
          prev ? { ...prev, about: data.updateAbout.about } : prev
        );
        setIsEditingAbout(false);
      }
    } catch (err) {
      console.error("Error saving about section:", err);
    }
  };

  const renderWorkHistory = () =>
    userData?.workHistory?.length ? (
      <div className="profile-work-history">
        <h3 className="profile-subheading">Work History</h3>
        {userData.workHistory.map((job, index) => (
          <div key={index} className="work-history-item">
            <p>
              <strong>Position:</strong> {job.position}
            </p>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {new Date(job.startDate).toLocaleDateString()} -{" "}
              {job.endDate ? new Date(job.endDate).toLocaleDateString() : "Present"}
            </p>
            {job.description && (
              <p>
                <strong>Description:</strong> {job.description}
              </p>
            )}
            <hr />
          </div>
        ))}
      </div>
    ) : null;

  if (loading) return <p className="profile-message">Loading...</p>;
  if (error) return <p className="profile-message error">{error}</p>;

  return (
    <div className="profile-container">
      {userData ? (
        <>
          <h2 className="profile-heading">{userData.username}'s Profile</h2>
          <p className="profile-info">Email: {userData.email}</p>

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

          {renderWorkHistory()}
        </>
      ) : (
        <p className="profile-message">No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
