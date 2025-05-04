import React, { useEffect } from "react";
import UnverifiedAlumniCard from "./subComponent/UnverifiedAlumniCard";
import AllUsersCard from "./subComponent/AllUsersCard";
import {
  changeRole,
  deleteUser,
  getAllUsers,
  getUnverifiedUsers,
  verifyAlumni,
} from "@/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllusers,
  setUnverifiedusers,
  setUnverifiedusersList,
} from "@/features/auth/authSlice";
import { toast } from "sonner";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { allusers, unverified } = useSelector((state) => state.auth);

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    dispatch(setAllusers(res));
  };

  const fetchUnverifiedUsers = async () => {
    const res = await getUnverifiedUsers();
    dispatch(setUnverifiedusersList(res));
  };

  useEffect(() => {
    Promise.all([fetchAllUsers(), fetchUnverifiedUsers()]);
  }, []);

  const handleVerify = async (userId) => {
    const res = await verifyAlumni(userId);
    if (res.success) {
      dispatch(setUnverifiedusers(userId));
      fetchAllUsers();
      toast.success(res.message);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    const res = await changeRole(userId, newRole);
    if (res.success) {
      toast.success(res.message);
      fetchAllUsers();
    }
  };

  const handleDelete = async (userId) => {
    const res = await deleteUser(userId);
    if (res.success) {
      toast.success(res.message);
      fetchAllUsers();
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Unverified Alumni */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Unverified Alumni</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {unverified?.length === 0 ? (
            <p className="text-gray-500">No unverified alumni found.</p>
          ) : (
            unverified?.map((user) => (
              <UnverifiedAlumniCard
                key={user._id}
                user={user}
                onVerify={() => handleVerify(user._id)}
              />
            ))
          )}
        </div>
      </div>

      {/* All Users */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Users</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allusers?.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            allusers?.map((user) => (
              <AllUsersCard
                key={user._id}
                user={user}
                onChangeRole={(role) => handleChangeRole(user._id, role)}
                onDelete={() => handleDelete(user._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
