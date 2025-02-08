import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./Config/dataBase.js";

dotenv.config({
  path: "./.env",
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`);
});
