import axiosInstance from "@/utils/axios";

export const getJobs = async()=>{
  const {data} = await axiosInstance.get('/jobs/getall');
  return data.allJobs;
}
export const getSingleJob = async(jobId)=>{
  const {data} = await axiosInstance.get(`/jobs/get/${jobId}`);
  return data.job;
}