import { getJobs } from "@/features/job/jobService";
import { useEffect } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "@/features/job/jobSlice";

const Job = () => {
  const { jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      dispatch(setJobs(data));
    };
    fetchJobs();
  }, [dispatch]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mt-2 text-center">
          Job Openings
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-2">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
    </>
  );
};

export default Job;
