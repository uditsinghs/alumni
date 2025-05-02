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
            src={user?.profileImage?.url || "data:image/png;base64,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"}
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
