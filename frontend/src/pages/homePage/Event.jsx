import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { applyForEvent } from "@/features/event/eventService";
import { toast } from "sonner";
import { useSelector } from "react-redux";
const Event = ({ event }) => {
  const { image, title, description, date, location } = event;
  const handleRegisterUser = async (eventId) => {
    const data = await applyForEvent(eventId);
    if (data.success) {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  };
  const { user } = useSelector((state) => state.auth);
  const isApplied = event.attendees.includes(user._id);
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg relative">
      <CardContent className="p-4 space-y-3">
        {image?.url && (
          <img
            src={image.url}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        <h2 className="text-xl font-semibold text-primary">{title}</h2>
        <div className="flex justify-around ">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{description}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          </div>
          <div className="">
            <Button
              disabled={isApplied}
              onClick={() => handleRegisterUser(event._id)}
              className="absolute bottom-0 right-3 mb-3 ml-2 hover:bg-blue-950 "
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Event;
