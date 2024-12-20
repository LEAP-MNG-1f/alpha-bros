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
      toast("Уучларай", {
        description: "Та эхлээд нэвтэрнэ үү",
        action: {
          label: "Хаах",
          onClick: () => console.log("Та эхлээд нэвтэрнэ үү"),
        },
      });
      return;
    }
    if (!date) {
      toast("Мэдээлэл дутуу байна.", {
        description: "Өдрөө оруулна уу!",
        action: {
          label: "Хаах",
          onClick: () => console.log("Өдөр сонгоогүй байна!"),
        },
      });
      return;
    }
    if (people == "") {
      toast("Мэдээлэл дутуу байна.", {
        description: "Хүний тоо оруулна уу!",
        action: {
          label: "Хаах",
          onClick: () => console.log("Хүний тоо оруулна уу!"),
        },
      });
      return;
    }
    if (parseInt(people) < 1) {
      toast("Мэдээлэл дутуу байна.", {
        description: "0 -ээс их хүн оруулна уу!",
        action: {
          label: "Хаах",
          onClick: () => console.log("0 -ээс их хүн оруулна уу!"),
        },
      });

      return;
    }
    if (!time) {
      toast("Мэдээлэл дутуу байна.", {
        description: "Цаг оруулна уу!",
        action: {
          label: "Хаах",
          onClick: () => console.log("Цаг оруулна уу!"),
        },
      });
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
    <main className="gap-2 px-5 bg-white flex flex-col rounded-lg shadow-lg h-auto w-[500px] border">
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#121316] text-sm font-medium leading-[140%]">
            Хүний тоогоо оруулна уу
          </p>
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
          <p className="text-[#121316] text-sm font-medium leading-[140%]">
            Цагаа оруулна уу
          </p>
          <Input
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) =>
              setDate(e.target.value ? new Date(e.target.value) : undefined)
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#121316] text-sm font-medium leading-[140%]">
            Өдрөө оруулна уу
          </p>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-md"
          />
        </div>
      </div>
      <div className="w-full border-[0.5px] border-x-0"></div>
      <div className="w-full py-4">
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold text-lg text-SecondColor">
            Захиалгын мэдээлэл
          </h3>
          <div className="w-full border-[0.5px] border-white my-1"></div>
          <p className="text-base font-semibold leading-normal not-italic">
            Өдөр:{" "}
            {
              <span className="font-normal">
                {date?.toLocaleDateString() || "Сонгоогүй"}
              </span>
            }
          </p>
          <p className="text-base font-semibold leading-normal not-italic">
            Хүмүүсийн тоо:{" "}
            {<span className="font-normal"> {people || "Сонгоогүй"} </span>}
          </p>
          <p className="text-base font-semibold leading-normal not-italic">
            Цаг: {<span className="font-normal">{time || "Сонгоогүй"}</span>}
          </p>
        </div>
      </div>
      <div className="w-full border-[0.5px] border-x-0"></div>
      <div className="w-full h-16 grid grid-cols-2 gap-4 pb-4 items-center">
        <button
          className="bg-slate-100 duration-200 text-SecondColor border font-semibold px-4 py-2 rounded-lg h-[40px] w-full"
          onClick={() => {
            setDate(undefined);
            setPeople("");
            setTime("");
          }}
        >
          Арилгах
        </button>
        {isLoading === false ? (
          <button
            onClick={handleOrderSubmit}
            className="bg-SecondColor hover:bg-SecondColor/70 duration-200 text-white font-semibold px-4 py-2 rounded-lg h-[40px] w-full"
          >
            Захиалга өгөх
          </button>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-4 bg-SecondColor/70 text-white px-4 py-2 rounded-lg h-[40px] w-full"
          >
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="font-semibold">Уншиж байна</p>
          </button>
        )}
      </div>
    </main>
  );
};

{
  /* <button
          className="bg-SecondColor hover:bg-SecondColor/70 duration-200 text-white font-semibold p-4 rounded-lg w-full"
          onClick={handleOrderSubmit}
        >
          {isLoading ? "Уншиж байна" : " Захиалга өгөх"}
        </button> */
}
