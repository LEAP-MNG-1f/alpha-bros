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

const upload = multer({ dest: "./uploads/" });
const placesRoute = express.Router();

placesRoute.post("/places", upload.single("image"), createPlaces);
placesRoute.get("/places", getAllPlaces);
// placesRoute.get("/place/:id", getPlace);
placesRoute.put("/places/:id", updatePlaces);
placesRoute.delete("/places/:id", deletePlaces);
placesRoute.get("/selected", getSelectedPlaces);
placesRoute.get("/places/:id", getSinglePagePlaces);

export default placesRoute;
