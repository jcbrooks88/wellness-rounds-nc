import { Link } from 'react-router-dom';
import Login from '../components/login/Login';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <Login />
      <p>
        Not a member? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
