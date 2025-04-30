import React, { useEffect, useState } from "react";
import Event from "./Event";
import { getEvents } from "@/features/event/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);
  return (
    <div className="p-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center mb-6">Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {events?.map((event) => (
          <Event key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
