import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default RoleBasedRoute;
