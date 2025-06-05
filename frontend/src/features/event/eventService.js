import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

export const getEvents = async () => {
  try {
    const { data } = await axiosInstance.get('/events/getall');
    return data.Events;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch events");
    throw error;
  }
};

export const getSingleEvent = async (eventId) => {
  try {
    const { data } = await axiosInstance.get(`/events/get/${eventId}`);
    return data.event;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch event");
    throw error;
  }
};

export const applyForEvent = async (eventId) => {
  try {
    const { data } = await axiosInstance.put(`/events/apply/${eventId}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to apply for event");
    throw error;
  }
};

// Admin
export const createEvent = async (eventData) => {
  try {
    const { data } = await axiosInstance.post('/events/create', eventData);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create event");
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const { data } = await axiosInstance.delete(`/events/delete/${eventId}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete event");
    throw error;
  }
};

export const updateEvent = async (eventId, formData) => {
  try {
    const { data } = await axiosInstance.put(`/events/edit/${eventId}`, formData);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update event");
    throw error;
  }
};

export const getAllAppliedUsers = async () => {
  try {
    const { data } = await axiosInstance.get('/events/getapplied');
    return data.events;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch applied users");
    throw error;
  }
};
