import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { applyForEvent, getSingleEvent } from "@/features/event/eventService";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  // const {image,title,description,date,attendees} = event;

  useEffect(() => {
    const fetchSingleEvent = async () => {
      const data = await getSingleEvent(eventId);
      setEvent(data);
    };
    fetchSingleEvent();
  }, [eventId]);

  const handleRegisterUser = async (eventId) => {
    const data = await applyForEvent(eventId);
    if (data.success) {
      toast.success(data?.message);
      const updatedEvent = await getSingleEvent(eventId);
      setEvent(updatedEvent);
    } else {
      toast.error(data?.message);
    }
  };
  const { user } = useSelector((state) => state.auth);
  const isApplied = event.attendees?.includes(user._id);
  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex justify-center">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardContent className="p-6 space-y-4">
          {event?.image?.url && (
            <img
              src={event?.image.url}
              alt={event?.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <h1 className="text-2xl font-bold text-primary">{event?.title}</h1>
          <p className="text-sm text-muted-foreground">{event?.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={18} />
              <span>{new Date(event?.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={18} />
              <span>{event?.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={18} />
              <span>{event?.attendees?.length} Attendees</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button onClick={() => navigate(-1)} className="px-6">
              Go Back
            </Button>
            <Button
              disabled={isApplied}
              onClick={() => handleRegisterUser(event._id)}
              className="ml-2 hover:bg-blue-950 "
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailPage;
