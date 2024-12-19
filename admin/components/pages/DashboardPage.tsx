"use client";

import { useEffect, useState } from "react";
import { DashboardPageZone } from "../features/AdminDashboard/DashboardPageZone";
 
interface Place {
  image: string[];
  name: string;
  phoneNumber: string;
}

interface User {
  emails: string;
  first_name: string;
  last_name: string;
}

interface Order {
  placeId: Place;
  userId: User;
  process: string;
  _id: string;
  createdAt: string;
  orderDate: string;
  people: string;
  __v: number;
}

const DashboardPage = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);

  const BACKEND_END_POINT = process.env.BACKEND_URL;

  const orderDataFetch = async () => {
    try {
      const response = await fetch(`${BACKEND_END_POINT}/order`);
      const responseData = await response.json();
      const data = responseData.data.map((order: any) => ({
        ...order,
        placeId: {
          image: order.placeId.image,
          name: order.placeId.name,
          phoneNumber: order.placeId.phoneNumber,
        },
        userId: {
          emails: order.userId.emails,
          first_name: order.userId.first_name,
          last_name: order.userId.last_name,
        },
        people: Number(order.people),
      }));
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderDataFetch();
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-100">
      <DashboardPageZone orderData={orderData} />
    </main>
  );
};
export default DashboardPage;
