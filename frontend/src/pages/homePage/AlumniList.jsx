import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  getAlumnies } from "@/features/auth/authService"; // you'll define this
import { toast } from "sonner";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchAlumni = async () => {
    const res = await getAlumnies();
    if (res.success) {
      setAlumni(res.alumnies);
    } else {
      toast.error("Failed to fetch alumni list");
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleViewProfile = (alumnus) => {
    setSelectedAlumni(alumnus);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Alumni List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map((alumnus) => (
              <tr key={alumnus._id} className="border-t">
                <td className="px-4 py-2">{alumnus.name}</td>
                <td className="px-4 py-2">{alumnus.email}</td>
                <td className="px-4 py-2">{alumnus.batch}</td>
                <td className="px-4 py-2">{alumnus.branch}</td>
                <td className="px-4 py-2">{alumnus.jobTitle || "N/A"}</td>
                <td className="px-4 py-2">{alumnus.currentCompany || "N/A"}</td>
                <td className="px-4 py-2">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleViewProfile(alumnus)}>View Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      {selectedAlumni && (
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold">{selectedAlumni.name}</h2>
                          <img
                            src={selectedAlumni?.profileImage?.url || "/default-avatar.png"}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <p><strong>Email:</strong> {selectedAlumni.email}</p>
                          <p><strong>Batch:</strong> {selectedAlumni.batch}</p>
                          <p><strong>Branch:</strong> {selectedAlumni.branch}</p>
                          <p><strong>Job:</strong> {selectedAlumni.jobTitle || "N/A"}</p>
                          <p><strong>Company:</strong> {selectedAlumni.currentCompany || "N/A"}</p>
                          <p><strong>Location:</strong> {selectedAlumni.location || "N/A"}</p>
                          <p><strong>Bio:</strong> {selectedAlumni.bio || "N/A"}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniList;
