import { Places } from "../model/places.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Location } from "../model/location.model.js";

const createPlaces = async (req, response) => {
  try {
    const {
      name,
      category,
      capacity,
      description,
      phoneNumber,
      province,
      district,
      street,
      latitude,
      longitude,
      ambiance,
      weekdaysOpen,
      weekdaysClose,
      weekendOpen,
      weekendClose,
      closedDay,
    } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return response
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const uploadResults = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "places",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        })
      )
    );

    const uploadedUrls = uploadResults.map((result) => result.url);

    const addLocation = await Location.create({
      province,
      district,
      street,
      latitude,
      longitude,
    });

    const result = await Places.create({
      name,
      image: uploadedUrls,
      category,
      capacity,
      description,
      phoneNumber,
      location: addLocation?._id,
      ambiance,
      workingHours: {
        weekdays: { open: weekdaysOpen, close: weekdaysClose },
        weekend: { open: weekendOpen, close: weekendClose },
        closedDay,
      },
    });

    response.status(200).json({
      success: true,
      data: {
        location: addLocation,
        places: result,
      },
    });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
};

//
const getSelectedPlaces = async (req, res) => {
  try {
    const { categorizedPlaces, placesLocation, capacity } = req.query;

    const parsedCapacity = capacity ? parseInt(capacity, 10) : null;

    const filteredPlaces = await Places.find()
      .populate("category")
      .populate("location");

    let placesToReturn = filteredPlaces;

    if (categorizedPlaces) {
      placesToReturn = placesToReturn.filter((place) => {
        return (
          place.category &&
          place.category.name &&
          place.category.name.toLowerCase() === categorizedPlaces.toLowerCase()
        );
      });
    }

    if (placesLocation) {
      placesToReturn = placesToReturn.filter((place) => {
        return (
          place.location &&
          place.location.district &&
          place.location.district.toLowerCase() === placesLocation.toLowerCase()
        );
      });
    }

    if (parsedCapacity !== null) {
      placesToReturn = placesToReturn.filter((place) => {
        return place.capacity >= parsedCapacity;
      });
    }

    if (placesToReturn.length > 0) {
      res.status(200).json({ success: true, data: placesToReturn });
    } else {
      res.status(200).json({ success: false, data: "Places not found" });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getSinglePagePlaces = async (req, res) => {
  try {
    const PlacesId = req.params["id"];
    const result = await Places.findById(PlacesId)
      .populate("category")
      .populate("location");

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const result = await Places.find()
      .populate("category")
      .populate("location");

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updatePlaces = async (req, res) => {
  try {
    const {
      name,
      category,
      capacity,
      description,
      ambiance,
      weekdaysOpen,
      weekdaysClose,
      weekendOpen,
      weekendClose,
      closedDay,
      locationId,
      province,
      district,
      street,
      latitude,
      longitude,
    } = req.body;

    const files = req.files;
    let imageAdded = true;
    let uploadedUrls;
    let result;
    if (files.length === 0) {
      imageAdded = false;
    }
    if (imageAdded) {
      const uploadResults = await Promise.all(
        files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "places",
            transformation: [{ quality: "auto", fetch_format: "auto" }],
          })
        )
      );

      uploadedUrls = uploadResults.map((result) => result.url);
    }

    if (locationId) {
      const updatedLocation = await Location.findByIdAndUpdate(locationId, {
        province,
        district,
        street,
        latitude,
        longitude,
      });
      if (!updatedLocation) {
        return res.status(404).json({});
      }
    } else {
      return res.status(400).json();
    }

    const placesId = req.params["id"];
    if (imageAdded) {
      result = await Places.findByIdAndUpdate(placesId, {
        name,
        $push: {
          image: { $each: uploadedUrls },
        },
        category,
        capacity,
        description,
        ambiance,
        workingHours: {
          weekdays: { open: weekdaysOpen, close: weekdaysClose },
          weekend: { open: weekendOpen, close: weekendClose },
          closedDay,
        },
      });
    } else {
      result = await Places.findByIdAndUpdate(
        placesId,
        {
          name,
          category,
          capacity,
          description,
          ambiance,
          workingHours: {
            weekdays: { open: weekdaysOpen, close: weekdaysClose },
            weekend: { open: weekendOpen, close: weekendClose },
            closedDay,
          },
        },
        {
          new: true,
        }
      );
    }
    console.log("result is:", result);
    if (result) {
      return res.status(201).json({});
    } else {
      return res.status(404).json({});
    }
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ error });
  }
};

const deletePlaces = async (req, res) => {
  try {
    const { placesId } = req.body;
    const findedPlace = await Places.findById(placesId).populate("location");
    const locationId = findedPlace.location._id;
    console.log(locationId);
    const deleteLocation = await Location.findByIdAndDelete(locationId);
    const result = await Places.findByIdAndDelete(placesId);
    res.status(200).json({
      success: true,
      data: { deleteLocation, result },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export {
  createPlaces,
  getAllPlaces,
  updatePlaces,
  deletePlaces,
  getSelectedPlaces,
  getSinglePagePlaces,
};
