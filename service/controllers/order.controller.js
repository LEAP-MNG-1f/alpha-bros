import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";

const createOrder = async (req, res) => {
  console.log(req.body);

  try {
    const { clerkId, stringDate, people, placeId } = req.body;
    const user = await User.findOne({ clerk_id: clerkId });
    if (!user) {
      return res.status(404).json({});
    }
    const id = user._id;
    const result = await Order.create({
      userId: id,
      placeId: placeId,
      orderDate: new Date(stringDate),
      people: people,
    });
    if (result) {
      return res.status(201).json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSelectedUsersandLatestOrder = async (req, res) => {
  try {
    const clerkId = req.params["id"];
    const user = await User.findOne({ clerk_id: clerkId });
    if (!user) {
      return res.status(404);
    }
    const userId = user?._id;
    const OrderData = await Order.find({ userId });
    const LatestData = await Order.findOne({ userId }).populate("placeId");
    res.status(200).json({ success: true, data: { OrderData, LatestData } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const result = await Order.find().populate("userId").populate("placeId");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const changeOrderRole = async (req, res) => {
  try {
    const { orderId, newProcess } = req.body;
    const result = await Order.findByIdAndUpdate(orderId, {
      process: newProcess,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  createOrder,
  getAllOrder,
  getSelectedUsersandLatestOrder,
  changeOrderRole,
};
