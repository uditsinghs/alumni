import axiosInstance from "@/utils/axios";

export const getEvents = async()=>{
  const {data} = await axiosInstance.get('/events/getall');
  return data.Events
}

export const applyForEvent = async(eventId)=>{
  const {data} = await axiosInstance.put(`/events/apply/${eventId}`);
  return data;
}