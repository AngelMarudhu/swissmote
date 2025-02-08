import express from "express";
import {
  createEvent,
  getAllEvents,
  filterEvents,
  editEvent,
  deleteEvent,
} from "../Controllers/eventController.js";

export const eventRoute = express.Router();

eventRoute.post("/create", createEvent);
eventRoute.get("/get-all-events", getAllEvents);
//// query filter endpoints
eventRoute.get("/filter", filterEvents);
///// edit event
eventRoute.put("/edit/:id", editEvent);
eventRoute.delete("/delete/:id", deleteEvent);
