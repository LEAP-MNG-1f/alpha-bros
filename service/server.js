import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import placesRoute from "./routes/places.route.js";
import categoryRouter from "./routes/category.route.js";
import locationRouter from "./routes/location.route.js";
import cloudinary from "cloudinary";
import OrderRouter from "./routes/order.route.js";
import { sendMail } from "./controllers/mail.controller.js";
import imageRoute from "./routes/image.route.js";

const server = express();
const Port = 8000;
dotenv.config();
mongoose.connect(process.env.MONGODB_CONNECT_URL);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api", locationRouter);
server.use("/api", categoryRouter);
server.use("/api", userRouter);
server.use("/api", placesRoute);
server.use("/api", OrderRouter);
server.post("/api/sendmail", sendMail);
server.use("/api", imageRoute);

server.listen(Port, () => {
  console.log(`Server started http://localhost:${Port}`);
});
