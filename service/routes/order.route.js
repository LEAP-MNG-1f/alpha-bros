import express from "express";
import {
  changeOrderRole,
  createOrder,
  getAllOrder,
  getSelectedUsersandLatestOrder,
} from "../controllers/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post("/order", createOrder);
OrderRouter.get("/order", getAllOrder);
OrderRouter.get("/userorder/:id", getSelectedUsersandLatestOrder);
OrderRouter.put("/order", changeOrderRole);

 
export default OrderRouter;
