import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { updateProfile } from "@/features/auth/authService";
import { toast } from "sonner";
import { editProfile } from "@/features/auth/authService";
import { getUser } from "@/features/auth/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentCompany: user.currentCompany || "",
    jobTitle: user.jobTitle || "",
    location: user.location || "",
    bio: user.bio || "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("currentCompany", formData.currentCompany);
    form.append("jobTitle", formData.jobTitle);
    form.append("location", formData.location);
    form.append("bio", formData.bio);
    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    const res = await editProfile(form);
    if (res.success) {
      dispatch(getUser(res.user));
      toast.success(res.message);
      setOpen(false);
    } else {
      toast.error(res.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-xl mx-auto shadow-lg rounded-lg p-6 bg-white dark:bg-gray-900">
        <div className="text-center mb-6">
          <img
            src={user?.profileImage?.url || "/default-avatar.png"}
            alt="N/A"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-bold text-sm"> {user.bio || "N/A"}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Batch:</strong> {user.batch}
          </p>
          <p>
            <strong>Branch:</strong> {user.branch}
          </p>
          <p>
            <strong>Company:</strong> {user.currentCompany || "N/A"}
          </p>
          <p>
            <strong>Job :</strong> {user.jobTitle || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {user.location || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Verified:</strong> {user.isVarified ? "Yes" : "No"}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <Input
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                placeholder="Current Company"
              />
              <Input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
              />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <Input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
              />
              <Input type="file" onChange={handleFileChange} />
              <div className="text-center">
                <Button onClick={handleSubmit}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
