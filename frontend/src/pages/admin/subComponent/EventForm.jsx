import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEvent, updateEvent } from "@/features/event/eventService";
import { toast } from "sonner";



const EventForm = ({ editingEvent, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    image: null,
  });



  useEffect(() => {
    if (editingEvent) {
      setForm(editingEvent);
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    let res;
    if (editingEvent) {
      res = await updateEvent(editingEvent._id, formData);
      
    } else {
      res = await createEvent(formData);
      
    }

    if (res?.success) {
      toast.success(res.message);
      onSuccess(); 
      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        image: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <Input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <Input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <Input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <Input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <Button type="submit">
        {editingEvent ? "Update Event" : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
