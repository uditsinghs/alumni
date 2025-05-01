import React, { useState } from "react";
import EventForm from "./subComponent/EventForm";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, getEvents } from "@/features/event/eventService";
import { removeEvent, setEventSlice } from "@/features/event/eventSlice";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ManageEvents = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const [editEvent, setEditEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const refreshEvents = async () => {
    const res = await getEvents();
    dispatch(setEventSlice(res));
  };

  const handleDelete = async (id) => {
    const res = await deleteEvent(id);
    if (res?.success) {
      dispatch(removeEvent(id));
      // refreshEvents();
      toast.success(res.message);
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setOpenDialog(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Create or Edit Event */}
        <div className="bg-white rounded-md shadow p-4">
          <EventForm editingEvent={null} onSuccess={refreshEvents} />
        </div>

        {/* Right: List Events */}
        <div className="space-y-4">
          {events?.length === 0 ? (
            <p>No events available</p>
          ) : (
            events.map((event) => (
              <Card key={event._id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Pencil size={16} className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(event._id)}
                      >
                        <Trash2 size={16} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="text-sm">
                    <strong>Location:</strong> {event.location}
                  </div>
                  <div className="text-sm">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    <strong>Participent:</strong> {event.attendees?.length}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <EventForm
            editingEvent={editEvent}
            onSuccess={() => {
              setOpenDialog(false);
              refreshEvents();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEvents;
