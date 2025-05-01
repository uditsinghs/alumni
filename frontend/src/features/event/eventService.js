import axiosInstance from "@/utils/axios";

export const getEvents = async () => {
  const { data } = await axiosInstance.get('/events/getall');
  return data.Events
}
export const getSingleEvent = async (eventId) => {
  const { data } = await axiosInstance.get(`/events/get/${eventId}`);
  return data.event;
}

export const applyForEvent = async (eventId) => {
  const { data } = await axiosInstance.put(`/events/apply/${eventId}`);
  return data;
}
// admin 
export const createEvent = async (eventData) => {
  const { data } = await axiosInstance.post('/events/create', eventData);
  return data;
}
export const deleteEvent = async (eventId) => {
  const { data } = await axiosInstance.delete(`/events/delete/${eventId}`);
  return data;
}
export const updateEvent = async (eventId,formData) => {
  const { data } = await axiosInstance.put(`/events/edit/${eventId}`,formData);
  return data;
}

export const getAllAppliedUsers = async () => {
  const { data } = await axiosInstance.get('/events/getapplied');
  return data.events
}