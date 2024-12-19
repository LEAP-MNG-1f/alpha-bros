import express from "express";
import {
  changeOrderRole,
  createOrder,
  getAllOrder,
  getLatestOrder,
  getSelectedUsersOrder,
} from "../controllers/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post("/order", createOrder);
OrderRouter.get("/order", getAllOrder);
OrderRouter.get("/userorder/:id", getSelectedUsersOrder);
OrderRouter.put("/order", changeOrderRole);
OrderRouter.get("/latestorder/:id", getLatestOrder);

export default OrderRouter;
