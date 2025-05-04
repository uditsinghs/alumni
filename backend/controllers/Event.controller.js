import { Event } from "../models/event.model.js"
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";



export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const image = req.file;

    // Basic Validation
    if (!title || !description || !date || !location) {
      return res.status(400).json({
        message: "Please provide all required fields (title, description, date, location)",
        success: false,
      });
    }

    const newEventData = {
      title,
      description,
      date,
      location,
    };

    // Handle optional image upload
    if (image) {
      const cloudinaryResponse = await uploadImageOnCloudinary(image.path);
      newEventData.image = {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    }

    // Create event in DB
    const createdEvent = await Event.create(newEventData);

    return res.status(201).json({
      message: "Event created successfully.",
      success: true,
      event: createdEvent,
    });

  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {

    const Events = await Event.find({});
    if (Events.length === 0) {
      return res.status(400).json({ message: "No Event available", success: false })
    }
    return res.status(200).json({ success: true, Events })
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export const getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {

      return res.status(404).json({ message: "No eventId found", success: false })
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "No event found", success: false })
    }
    return res.status(200).json({ success: true, event })
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(404).json({ message: "No eventId found", success: false });
    }

    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: "No event found", success: false });
    }

    return res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    console.log(title, description, date, location);

    const image = req.file;
    const { eventId } = req.params;
    if (!eventId) {

      return res.status(404).json({ message: "No eventId found", success: false })
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "No event found", success: false })
    }

    // if any value exist then update that value;
    if (title) {
      event.title = title || event.title;

    }
    if (description) {
      event.description = description || event.description;

    }
    if (date) {
      event.date = date || event.date;

    }
    if (location) {
      event.location = location || event.location;
    }
    if (image) {
      const cloudinaryResponse = await uploadImageOnCloudinary(image.path);
      event.image.url = cloudinaryResponse.secure_url;
      event.public_id = cloudinaryResponse.public_id;
    }

    await event.save();
    return res.status(200).json({
      message: "Event updated successfully.",
      success: true,
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};
export const registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    // Check eventId
    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required",
        success: false,
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    // Check if already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({
        message: "User already registered for this event",
        success: false,
      });
    }

    // Register user
    event.attendees.push(userId);
    await event.save();

    return res.status(200).json({
      message: "Successfully registered for the event",
      success: true,
      event,
    });

  } catch (error) {
    console.error("Event registration failed:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};


export const getEventsRegisteredUsers = async (req, res) => {
  try {
    // Find all events and populate their attendees
    const events = await Event.find()
      .select("title attendees")
      .populate({
        path: "attendees",
        select: "name email", 
      });

    if (events.length === 0) {
      return res.status(400).json({ message: "No events available", success: false });
    }

    return res.status(200).json({
      success: true,
      events,
    });

  } catch (error) {
    console.error("Error fetching registered users for events:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

