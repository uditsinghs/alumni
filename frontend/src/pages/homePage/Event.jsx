import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { applyForEvent } from "@/features/event/eventService";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Event = ({ event }) => {
  const { image, title, description, date, location } = event;
  let truncated =
    description.length > 16 ? `${description.slice(0, 16)}...` : description;

  const [isApplied, setIsApplied] = useState(false);
  const handleRegisterUser = async (eventId) => {
    const data = await applyForEvent(eventId);
    if (data.success) {
      toast.success(data?.message);
      setIsApplied(true);
    } else {
      toast.error(data?.message);
      
    }
  };
  const { user } = useSelector((state) => state.auth);
  console.log("user==",user._id);
  
  useEffect(() => {
    setIsApplied(event.attendees.includes(user._id));
  }, [event.attendees, user._id]);
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-4 space-y-3">
        {image?.url && (
          <img
            src={image.url}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        <h2 className="text-xl font-semibold text-primary">{title}</h2>
        <div className="flex justify-around flex-col gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{truncated}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <Button
                disabled={isApplied}
                onClick={() => handleRegisterUser(event._id)}
                className="mb-3 ml-2 hover:bg-blue-950 "
              >
                {isApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            <div className="">
              <Link to={`/eventdetail/${event._id}`}>
                <Button className=" mb-3 ml-2 hover:bg-blue-950 ">View</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Event;
