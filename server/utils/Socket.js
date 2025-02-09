import { Server } from "socket.io";
import Event from "../Models/EventModel.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket User Connected");

    socket.on("join_event", async ({ eventId, userId }) => {
      //   console.log("Event Joined", eventId, userId);
      try {
        // console.log("Event Joined success", eventId, userId);

        const event = await Event.findById(eventId);

        if (!event) {
          socket.emit("error", { message: "Event not found" });
          return;
        }

        socket.join(eventId);

        if (!event.attendees.includes(userId)) {
          event.attendees.push(userId);
          await event.save();
        } else {
          socket.emit("error", {
            message: "You are already attending this event",
          });
          return;
        }

        io.to(eventId).emit("event_joined", {
          eventId,
          attendees: event.attendees,
        });
      } catch (error) {
        socket.emit("error", { message: "Server error" });
      }

      socket.on("disconnect", () => {
        // console.log("User Disconnected");
        socket.leave(eventId);
      });
    });
  });

  return io;
};
