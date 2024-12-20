"use client";
import { useEffect, useState } from "react";
import { BACKEND_END_POINT } from "../buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  process: "Батлагдсан" | "Цуцлагдсан" | "Хүлээгдэж Байна";
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
  const [process, setProcess] = useState(order.process);
  const [isLoading, setIsLoading] = useState(false);
  const [newProcess, setNewProcess] = useState("Хүлээгдэж Байна");

  const toSentMail = order.userId.emails;

  const fetchProcessChange = async (newProcess: string) => {
    const orderId = order._id;

    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, newProcess }),
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${BACKEND_END_POINT}/order`, option);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Процессийг шинэчлэх үед алдаа гарлаа");
      }

      setProcess(data.process);
    } catch (error) {
      console.error("Error updating process:", error);
    } finally {
      setIsLoading(false);
    }

    let mailText = "";
    const Subject = "LIHGT HOUSE Захиалгын мэдээлэл";

    switch (newProcess) {
      case "Батлагдсан":
        mailText = "Таны захиалга амжилттай хийгдлээ";
        break;
      case "Цуцлагдсан":
        mailText = "Таны захиалга амжилтгүй боллоо";
        break;
    }

    console.log("retdwdferfertg");

    const optionEmail = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toSentMail, mailText, Subject }),
    };

    try {
      const response = await fetch(
        `http://localhost:8000/sendmail`,
        optionEmail
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Процессийг шинэчлэх үед алдаа гарлаа");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const handleProcessChange = () => {
  //   let newProcess: "Батлагдсан" | "Цуцлагдсан" | "Хүлээгдэж Байна";

  //

  //   setProcess(newProcess);
  //   fetchProcessChange(newProcess);
  // };

  useEffect(() => {
    if (newProcess !== order.process) {
      fetchProcessChange(newProcess);
    }
  }, [newProcess, order.process]);

  // const getProcessColor = () => {
  //   switch (process) {
  //     case "Батлагдсан":
  //       return "text-green-600";
  //     case "Цуцлагдсан":
  //       return "text-red-600";
  //     case "Хүлээгдэж Байна":
  //       return "text-yellow-600";
  //     default:
  //       return "text-[#3F4145]";
  //   }
  // };

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
          <img src={order.placeId.image[0]} alt={order.placeId.name} />
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
          Gmail - <span>{order.userId.emails}</span>
        </p>
        <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
          Нэр -{" "}
          <span>
            {order.userId.first_name} {order.userId.last_name}
          </span>
        </p>
      </div>
      <div className="px-6 py-4 flex items-start justify-center flex-col w-[230px]">
        <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
          Хүний тоо - <span>{order.people}</span>
        </p>
        <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
          {formattedDate}
        </p>
      </div>
      <div className="px-6 py-4 flex items-center w-[200px]">
        <Select onValueChange={(value) => setNewProcess(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Хүлээгдэж Байна" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-green-600" value="Батлагдсан">
              Батлагдсан
            </SelectItem>
            <SelectItem className="text-red-600" value="Цуцлагдсан">
              Цуцлагдсан
            </SelectItem>
          </SelectContent>
        </Select>

        {/* <button
          onClick={handleProcessChange}
          disabled={isLoading}
          className={`font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px] border p-2 rounded bg- ${getProcessColor()} ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "Шинэчлэж байна..." : process}
        </button> */}
      </div>
    </div>
  );
};
