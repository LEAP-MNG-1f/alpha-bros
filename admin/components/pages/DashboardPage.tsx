"use client";

import { useEffect, useState } from "react";
import { DashboardPageZone } from "../features/AdminDashboard/DashboardPageZone";

const DashboardPage = () => {
  const [orderData, setOrderData] = useState([]);

  const BACKEND_END_POINT = process.env.BACKEND_URL;

  const orderDataFetch = async () => {
    try {
      const response = await fetch(`${BACKEND_END_POINT}/order`);
      const responseData = await response.json();
      const data = responseData.data;
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(orderData, "orderData");

  useEffect(() => {
    orderDataFetch();
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-100">
      <DashboardPageZone />
    </main>
  );
};
export default DashboardPage;
