import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Updated to use useAuth hook
import { graphqlRequest } from "../../utils/api";

const GET_USER_QUERY = `
  query {
    me {
      _id
      username
      email
    }
  }
`;

const Profile: React.FC = () => {
  const { token, isAuthenticated } = useAuth(); // Access token and authentication status from context
  const [userData, setUserData] = useState<{ _id: string; username: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Use token from context
        const data = await graphqlRequest(GET_USER_QUERY, {}, headers);
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
  }, [isAuthenticated, token]); // Add token and isAuthenticated to dependencies

  if (!isAuthenticated) {
    return <p style={messageStyle}>You need to log in to view your profile.</p>;
  }

  if (loading) return <p style={messageStyle}>Loading...</p>;
  if (error) return <p style={errorStyle}>Error: {error}</p>;

  return (
    <div style={profileContainer}>
      {userData ? (
        <div>
          <h2 style={headingStyle}>{userData.username}'s Profile</h2>
          <p style={infoStyle}>Email: {userData.email}</p>
        </div>
      ) : (
        <p style={messageStyle}>No user data found.</p>
      )}
    </div>
  );
};

const profileContainer: React.CSSProperties = {
  maxWidth: "500px",
  margin: "20px auto",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  color: "#333",
  marginBottom: "10px",
};

const infoStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#555",
};

const messageStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#777",
  textAlign: "center",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "14px",
  textAlign: "center",
};

export default Profile;
