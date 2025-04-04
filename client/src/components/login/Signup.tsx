import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext)!;

  const [signupMutation, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      login(data.addUser);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation({ variables: { username, email, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p style={{ color: "red" }}>Signup failed. Try again.</p>}
      <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
    </form>
  );
};

export default Signup;
