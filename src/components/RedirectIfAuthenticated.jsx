import { Navigate } from "react-router-dom";
import { useAuth } from "../Ccontext/AuthContext";

export default function RedirectIfAuthenticated({ children }) {
  const { user } = useAuth();

  if (user) {
    
    return <Navigate to="/store" replace />;
  }

  return children;
}
