"use client";

import { districts } from "@/constant/mockdatas";
import { TPlaces } from "@/types/DataTypes";
import {
  BookOpenTextIcon,
  MapPinIcon,
  MoveUpRight,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon } from "../icons";

const MainCard = (data: TPlaces) => {
  const router = useRouter();
  const [open, setOpen] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const selectedPlace = data; // Assuming you want to check the first place

      // Check if it's a closed day
      if (selectedPlace?.workingHours.closedDay === currentDay.toString()) {
        setOpen("Хаалттай");
        setColor("bg-red-100");
        return;
      }

      // Determine if it's a weekend or weekday
      const isWeekend = currentDay === 0 || currentDay === 6;
      const hours = isWeekend
        ? selectedPlace?.workingHours.weekend
        : selectedPlace?.workingHours.weekdays;

      const [openHour, openMinute] = hours.open.split(":").map(Number);
      const [closeHour, closeMinute] = hours.close.split(":").map(Number);

      const openTime = openHour * 60 + openMinute;
      const closeTime = closeHour * 60 + closeMinute;

      setOpen(
        currentTime >= openTime && currentTime <= closeTime
          ? "Нээлттэй"
          : "Хаалттай"
      );

      setColor(
        currentTime >= openTime && currentTime <= closeTime
          ? "bg-green-100"
          : "bg-red-100"
      );
    };

    checkOpenStatus();
  }, [data]);

  const imageUrl = data?.image[0];
  return (
    <div
      onClick={() => router.push(`/place/${data._id}`)}
      className="w-[300px] h-[500px] rounded-xl flex flex-col items-center border overflow-hidden group cursor-pointer"
    >
      <div className="rounded-xl w-full h-full relative">
        <Image
          src={imageUrl}
          alt={"Image"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          fill
        />
      </div>
      <div className="bg-white p-4 w-[300px] h-[200px] flex flex-col gap-4 text-black rounded-b-xl">
        <div className="flex flex-col border-b border-white">
          <p className="text-xl not-italic font-semibold leading-normal line-clamp-1">
            {data.name}
          </p>
          <div>
            <div className="flex gap-2 items-center">
              <div>
                <BookOpenTextIcon size={16} />
              </div>
              <span className="line-clamp-1 text-base font-normal ">
                {data.description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="flex items-center justify-center gap-1 border-b border-black ">
            <MapPinIcon size={16} />
            <p className="text-black line-clamp-1">
              {districts.map((district) => {
                return (
                  data.location?.district == district.idName && district.name
                );
              })}
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 border-b border-black ">
            <UsersIcon size={16} />
            <p>{data.capacity}</p>
          </div>
        </div>
        <div className={`flex justify-between`}>
          <div className={`${color} px-3 py-1 rounded-lg`}>
            <p className="font-bold text-sm">{open}</p>
          </div>
          <div className="flex gap-1 items-center justify-center  cursor-pointer   ">
            <button className="text-xs leading-normal not-italic">
              Дэлгэрэнгүй үзэх
            </button>
            <div className="origin-center group-hover:rotate-45 group-hover:translate-x-2 transition-all duration-300">
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainCard;
