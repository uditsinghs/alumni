import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  getSingleJob } from "@/features/job/jobService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getSingleJob(jobId);
        setJob(data);
      } catch (error) {
        toast.error("Failed to fetch job details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = () => {
    window.open(job?.applyLink, "_blank");
  };

  if (loading) return <p className="p-6">Loading job details...</p>;
  if (!job) return <p className="p-6">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">{job.position}</h1>
        <p className="text-lg font-medium mb-2">
          <span className="text-muted-foreground">Company:</span>{" "}
          {job.company}
        </p>
        <p className="text-lg font-medium mb-2">
          <span className="text-muted-foreground">Location:</span>{" "}
          {job.location}
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {job.description}
        </p>

        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-muted-foreground">Posted by:</p>
          <p className="text-base font-semibold">{job.postedBy?.name}</p>
          <p className="text-sm text-muted-foreground">
            {job.postedBy?.email}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={handleApply} className="w-full md:w-1/2">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
