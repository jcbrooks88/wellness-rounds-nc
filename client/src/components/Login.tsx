import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const Login: React.FC = () => {
  const [formState, setFormState] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [login, { data, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      if (data) {
        localStorage.setItem("id_token", data.login.token);
        window.location.assign("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>Error logging in</p>}
    </div>
  );
};

export default Login;
