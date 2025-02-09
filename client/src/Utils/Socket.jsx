import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:9000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

const useSocket = () => {
  const [isConnectd, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      //   console.log("socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      //   console.log("socket disconnected");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const joinEvent = (eventId, userId) => {
    // console.log("Joining event:", eventId, userId);
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    socket.emit("join_event", { eventId, userId });
  };

  return { socket, isConnectd, joinEvent };
};

export default useSocket;
