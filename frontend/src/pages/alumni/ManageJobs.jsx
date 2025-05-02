import React, { useEffect, useState } from "react";
import JobForm from "./subComponents/JobForm";
import JobCard from "./subComponents/JobCard";
import UpdateJobDialog from "./subComponents/UpdateJobDialog";
import { toast } from "sonner";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "@/features/job/jobService";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "@/features/job/jobSlice";

const ManageJobs = () => {
  const [editingJob, setEditingJob] = useState(null);
  const [open, setOpen] = useState(false);
  const { jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const fetchJobs = async () => {
    const res = await getJobs();
    dispatch(setJobs(res));
  };

  const handleCreate = async (jobData) => {
    const res = await createJob(jobData);
    if (res?.success) {
      toast.success(res?.message);
    }
    fetchJobs();
  };

  const handleDelete = async (id) => {
    const res = await deleteJob(id);
    if (res?.success) {
      toast.success(res?.message);
    }
    fetchJobs();
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setOpen(true);
  };

  const handleUpdate = async (id, jobData) => {
    const res = await updateJob(id, jobData);
    if (res?.success) {
      toast.success(res?.message);
    }
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-semibold">Create Job</h2>
      <JobForm onSubmit={handleCreate} />

      <h2 className="text-2xl font-semibold">All Jobs</h2>
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onUpdate={handleEdit}
            />
          ))
        )}
      </div>

      {editingJob && (
        <UpdateJobDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingJob(null);
          }}
          job={editingJob}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManageJobs;
