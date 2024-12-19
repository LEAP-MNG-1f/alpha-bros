"use client";

import { TCategories, TPlaces } from "@/types/DataTypes";
import MainCard from "@/components/ui/cards/MainCard";
import { useRouter } from "next/navigation";
import { DistributorCard } from "@/components/ui/cards/DistributorCard";
import { currentUser } from "@clerk/nextjs/server";

type TMenuProps = {
  categories: TCategories[];
  places: TPlaces[];
};

export const Menu = ({ places, categories }: TMenuProps) => {
  const router = useRouter();

  return (
    <main className="w-screen flex  items-center flex-col pb-10">
      <div className=" container flex justify-center flex-col mt-[100px]">
        <h1 className="text-2xl italic  sm:text-center text-left ">
          Хайж буй орчиноо сонгоно уу
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex w-full lg:justify-between rounded-2xl my-4 ">
          {categories.map((data: TCategories) => {
            return (
              <DistributorCard key={data._id} name={data.name} id={data._id} />
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-7 mx-auto">
          {places.map((data: TPlaces) => {
            return (
              <MainCard
                key={data._id}
                image={data.image}
                _id={data._id}
                name={data.name}
                category={data.category}
                capacity={data.capacity}
                phoneNumber={data.phoneNumber}
                description={data.description}
                location={data.location}
                workingHours={data.workingHours}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
