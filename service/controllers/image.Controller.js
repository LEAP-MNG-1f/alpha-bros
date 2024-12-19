import { Places } from "../model/places.model.js";

const deleteImage = async (req, res) => {
  try {
    const { imageUrl, placeId } = req.body;
    if (imageUrl && placeId) {
      const result = await Places.findByIdAndUpdate(placeId, {
        $pull: {
          image: imageUrl,
        },
      });
      if (result) {
        return res.status(200).json({});
      }
    } else {
      return res.status(400).json({});
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export { deleteImage };
