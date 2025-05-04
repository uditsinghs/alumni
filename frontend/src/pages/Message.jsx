import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MessagePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === "alumni" && user.isVarified) {
        setRedirect("/home");
      } else if (user.role === "alumni" && !user.isVarified) {
        setRedirect(null); // stay on the message page
      } else {
        setRedirect("/home"); // for other users
      }
    } else {
      setRedirect("/login"); // not logged in
    }
  }, [user]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Show this when user is unverified alumni
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-6 rounded shadow max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verification Pending
        </h2>
        <p className="text-gray-600 mb-4">
          Your account is under review. Please wait for admin verification before accessing the platform.
        </p>
        <p className="text-sm text-gray-500">
          If you believe this is a mistake, contact support or check back later.
        </p>
      </div>
    </div>
  );
};

export default MessagePage;
