import Event from "../Models/EventModel.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, cetegory } = req.body;

    if (
      !["sports", "music", "arts", "technology", "food", "other"].includes(
        cetegory
      )
    ) {
      return res.status(400).json({ error: "Invalid category" });
    }

    if (!title || !description || !dateTime) {
      return res
        .status(400)
        .json({ error: "Title, description, and dateTime are required" });
    }

    const newEvent = await Event.create({
      title,
      description,
      dateTime,
      location,
      cetegory,
      createdBy: req.user,
    });

    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(500).json(error);
  }
};

// For instance, if you have two collections, like Users and Posts, where each post stores a user ID to reference its author, you can use populate() to replace that user ID in the Posts collection with the full user information from the Users collection.
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to get events" });
  }
};

//// time to work on dashboard filteration buddy easy peasy

export const filterEvents = async (req, res) => {
  try {
    const { cetegory, fromDate, toDate } = req.query;
    // console.log(cetegory, fromDate, toDate);

    const filter = {};

    if (cetegory) {
      filter.cetegory = cetegory;
    }
    if (fromDate && toDate) {
      filter.dateTime = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const events = await Event.find(filter).populate("createdBy", "name email");

    if (events.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to get events" });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dateTime, location, cetegory } = req.body;

    // console.log(id);

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dateTime,
        location,
        cetegory,
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(404).json({ error: "There is happened something else" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Event deleted successfully", deletedEvent });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
