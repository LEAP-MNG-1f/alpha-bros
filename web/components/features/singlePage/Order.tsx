"use client";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const Order = ({ placeId }: { placeId: string }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [people, setPeople] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState<string>("");
  const currentUser = useAuth();
  const router = useRouter();
  const handleOrderSubmit = async () => {
    if (!currentUser.isSignedIn) {
      toast("Please sign in");
      return;
    }
    if (!date) {
      toast("Өдөр сонгоогүй байна.");
      return;
    }
    console.log("people is:", people);
    if (people == "") {
      toast("Хүний тоо оруулна уу");
      return;
    }
    if (parseInt(people) < 1) {
      toast("0 -ээс их хүн оруулна уу");
      return;
    }
    if (!time) {
      toast("Цаг оруулна уу !");
      return;
    }

    try {
      const clerkId = currentUser.userId;
      const stringDate = date.toString();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerkId, stringDate, people, time, placeId }),
      };
      setIsLoading(true);
      const response = await fetch(`${BACKEND_ENDPOINT}/api/order`, options);
      setIsLoading(false);
      if (response.status == 201) {
        toast(
          `Захиалга амжилттай: ${date.toLocaleDateString()} - ${people} хүн - ${time}`
        );
        router.push("/order");
        return;
      }
      if (response.status == 404) {
        toast("User not found");
        return;
      }
      if (response.status == 500) {
        const json = await response.json();
        toast(`error :${json.error}`);
      }
    } catch (error) {
      toast(`error: ${error}`);
    }
    setDate(new Date());
    setPeople("");
    setTime("");
  };

  return (
    <main className="flex flex-col gap-2 px-5 bg-white rounded-lg shadow-lg  h-screen w-[300px] ">
      <div className="flex flex-col gap-1">
        <Input
          type="number"
          value={people}
          onChange={(e) => {
            setPeople(e.target.value);
          }}
          placeholder="Хүний тоогоо оруулна уу"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-md"
        />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold text-lg">Захиалгын мэдээлэл</h3>
        <p>Өдөр: {date?.toLocaleDateString() || "Сонгоогүй"}</p>
        <p>Хүмүүсийн тоо: {people}</p>
        <p>Цаг: {time || "Сонгоогүй"}</p>
      </div>
      <button
        className="bg-MainColor text-white font-semibold p-4 rounded-lg w-full hover:shadow-2xl"
        onClick={handleOrderSubmit}
      >
        {isLoading ? "Уншиж байна" : " Захиалга өгөх"}
      </button>
      <button
        className="bg-gray-300 text-gray-700 font-semibold p-4 rounded-lg w-full hover:bg-gray-200"
        onClick={() => {
          setDate(new Date());
          setPeople("");
          setTime("");
        }}
      >
        Арилгах
      </button>
    </main>
  );
};
