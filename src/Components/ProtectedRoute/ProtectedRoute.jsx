import { use, useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/Auth.context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  if (token === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  } else {
    return children;
  }
}
