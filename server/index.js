import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./Config/dataBase.js";
import { initializeSocket } from "./utils/Socket.js";
import http from "http";

dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);

connectDB();

initializeSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`);
});
