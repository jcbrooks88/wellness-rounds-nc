import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext)!;
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
