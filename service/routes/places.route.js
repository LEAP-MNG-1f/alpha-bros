import express from "express";
import multer from "multer";
import {
  createPlaces,
  deletePlaces,
  getAllPlaces,
  getSelectedPlaces,
  getSinglePagePlaces,
  updatePlaces,
} from "../controllers/places.Controller.js";

const upload = multer({ dest: "uploads/" });
const placesRoute = express.Router();

placesRoute.post("/places", upload.array("image"), createPlaces);
placesRoute.get("/places", getAllPlaces);
placesRoute.put("/places/:id", upload.array("image"), updatePlaces);
placesRoute.delete("/places", deletePlaces);
placesRoute.get("/selected", getSelectedPlaces);
placesRoute.get("/places/:id", getSinglePagePlaces);

export default placesRoute;
