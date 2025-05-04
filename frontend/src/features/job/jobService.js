import axiosInstance from "@/utils/axios";

export const getJobs = async () => {
  const { data } = await axiosInstance.get('/jobs/getall');
  return data.allJobs;
}
export const getAlumniJobs = async () => {
  const { data } = await axiosInstance.get('/jobs/getuserjob');
  return data.allJobs;
}
export const getSingleJob = async (jobId) => {
  const { data } = await axiosInstance.get(`/jobs/get/${jobId}`);
  return data.job;
}


export const createJob = async (jobData) => {
  const { data } = await axiosInstance.post("/jobs/create",jobData);
  return data
}
export const updateJob = async (jobId,jobData) => {
  const { data } = await axiosInstance.put(`/jobs/edit/${jobId}`,jobData);
  return data
}
export const deleteJob = async (jobId) => {
  const { data } = await axiosInstance.delete(`/jobs/delete/${jobId}`);
  return data
}
