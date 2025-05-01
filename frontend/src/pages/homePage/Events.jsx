import React, { useEffect } from "react";
import Event from "./Event";
import { getEvents } from "@/features/event/eventService";
import { useDispatch, useSelector } from "react-redux";
import { setEventSlice } from "@/features/event/eventSlice";

const Events = () => {
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      dispatch(setEventSlice(data));
    };
    fetchEvents();
  }, [dispatch]);
  return (
    <div className="p-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center mb-6">Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {events?.length === 0
          ? (<p className="text-center text-2xl">No events Available </p>)
          : events?.map((event) => <Event key={event._id} event={event} />)}
      </div>
    </div>
  );
};

export default Events;
