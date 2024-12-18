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

const MainCard = (data: TPlaces) => {
  const router = useRouter();
  const [open, setOpen] = useState("");

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const selectedPlace = data; // Assuming you want to check the first place

      // Check if it's a closed day
      if (selectedPlace?.workingHours.closedDay === currentDay.toString()) {
        setOpen("Хаалттай");
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
    };

    checkOpenStatus();
  }, [data]);

  const imageUrl = data?.image[0];
  return (
    <div className="w-[300px] h-[500px] rounded-xl flex flex-col items-center border overflow-hidden">
      <div className="rounded-xl w-full h-full relative">
        <img
          src={imageUrl} // Fallback image
          alt={"Image"}
          style={{
            backgroundPosition: "center",
            width: "300px",
            height: "330px",
          }}
        />
      </div>
      <div className="bg-MainColor p-4 w-[300px] h-[200px] flex flex-col gap-4 text-MainWhite rounded-b-xl">
        <div className="flex flex-col border-b border-white">
          <p className="text-2xl line-clamp-1">{data.name}</p>
          <div>
            <div className="flex gap-2 items-center">
              <div>
                <BookOpenTextIcon size={16} />
              </div>
              <span className="line-clamp-1">{data.description}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="flex items-center justify-center gap-1 border-b border-MainWhite ">
            <MapPinIcon size={16} />
            <p className="text-MainWhite line-clamp-1">
              {districts.map((district) => {
                return (
                  data.location?.district == district.idName && district.name
                );
              })}
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 border-b border-MainWhite ">
            <UsersIcon size={16} />
            <p>{data.capacity}</p>
          </div>
        </div>
        <div className={`flex justify-between`}>
          <div className="font-bold text-xl">{open}</div>
          <div
            onClick={() => router.push(`/place/${data._id}`)}
            className="flex gap-1 items-center justify-center  cursor-pointer   "
          >
            <button>Дэлгэрэнгүй үзэх</button>
            <MoveUpRight />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainCard;
