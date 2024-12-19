import express from "express";
import { deleteImage } from "../controllers/image.Controller.js";
const imageRoute = express.Router();
imageRoute.delete("/image", deleteImage);
export default imageRoute;
