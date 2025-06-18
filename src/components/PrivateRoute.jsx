import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("token")); // Exemplo simples

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
