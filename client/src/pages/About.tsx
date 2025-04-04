import React from "react";

const About: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h2>About Our Application</h2>
      <p>
        Welcome to our MERN stack application! This project was built to provide
        users with an interactive platform for discussions and collaboration.
      </p>
      <p>
        Our mission is to create a secure and engaging environment where users
        can connect, share knowledge, and grow together.
      </p>
      <p>
        Whether you're here to ask questions, engage in discussions, or simply explore, 
        we’re excited to have you on board!
      </p>
    </div>
  );
};

const containerStyle = {
  textAlign: "center" as const,
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

export default About;
