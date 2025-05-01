import { getSingleUser } from "@/features/auth/authService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserView = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    const fetchSingleUser = async () => {
      const res = await getSingleUser(userId);
      setUser(res);
    };
    fetchSingleUser();
  }, []);
  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-xl mx-auto shadow-lg rounded-lg p-6 bg-white dark:bg-gray-900">
        <div className="text-center mb-6">
          <img
            src={user?.profileImage?.url || "/default-avatar.png"}
            alt="N/A"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <h2 className="text-xl font-semibold mt-2">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="text-bold text-sm"> {user?.bio || "N/A"}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Batch:</strong> {user?.batch}
          </p>
          <p>
            <strong>Branch:</strong> {user?.branch}
          </p>
          <p>
            <strong>Company:</strong> {user?.currentCompany || "N/A"}
          </p>
          <p>
            <strong>Job :</strong> {user?.jobTitle || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {user?.location || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
          <p>
            <strong>Verified:</strong> {user?.isVarified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserView;
