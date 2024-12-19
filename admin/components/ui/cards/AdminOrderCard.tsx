"use client";
import { useState } from "react";
import { string } from "yup";
import { BACKEND_END_POINT } from "../buttons";

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
interface AdminOrderCardProps {
  order: Order;
}
export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order }) => {
  const [process, setProcess] = useState("");
  const orderId = order._id;
  const fetchProcessChange = async () => {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId  }),
    };
    try {
      const response = await fetch(`${BACKEND_END_POINT}/order`, option);
      const data = await response.json();
      if(!response.ok) 
    } catch (error) {}
  };

  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <div className="flex justify-between border border-spacing-x-7 rounded-lg">
      <div className="px-6 py-4 flex w-[260px] items-start gap-2">
        <div className="w-[60px] h-[60px] border border-black rounded">
          <img src={order.placeId.image[0]} />
        </div>
        <div className="h-full flex flex-col justify-center">
          <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
            {order.placeId.phoneNumber}
          </p>
          <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
            {order.placeId.name}
          </p>
        </div>
      </div>
      <div className="px-6 py-4 flex items-start justify-center flex-col w-[330px]">
        <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
          Gmail - <span className="">{order.userId.emails}</span>
        </p>
        <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
          Нэр -
          <span className="">
            {order.userId.first_name}
            {order.userId.last_name}
          </span>
        </p>
      </div>
      <div className="px-6 py-4 flex items-start justify-center flex-col w-[230px]">
        <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
          Хүний тоо - <span className="">{order.people}</span>
        </p>
        <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
          {formattedDate}
        </p>
      </div>
      <div className="px-6 py-4 flex items-center w-[200px]">
        <button
          onClick={() => {}}
          className="text-[#3F4145] font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]"
        >
          {order.process}
        </button>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-5 h-5"></div>
      </div>
    </div>
  );
};
