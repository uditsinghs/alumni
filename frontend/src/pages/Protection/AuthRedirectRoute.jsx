import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRedirectRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  if(user){
    return <Navigate to="/" replace />;
  }
  

  return children;
};

export default AuthRedirectRoute;
