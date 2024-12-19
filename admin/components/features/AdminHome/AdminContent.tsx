import { Header } from "../Both";
import { AddPlaceButton } from "@/components/ui/buttons";
import { AdminPlaceCard } from "@/components/ui/cards";
import { TPlaces } from "@/data/DataTypes";
import { TCategories } from "@/data/DataTypes";
import { Dispatch, SetStateAction } from "react";

type AdminContentProps = {
  placesData: TPlaces[];
  categoryData: TCategories[];
  setDataEffect: Dispatch<SetStateAction<boolean>>;
  dataEffect: boolean;
};

export const AdminContent = ({
  placesData,
  categoryData,
  setDataEffect,
  dataEffect,
}: AdminContentProps) => {
  return (
    <main className="w-full h-[90%] pb-3">
      <Header />
      <div className="pl-8 pt-8 h-full">
        <div className="bg-white h-full rounded-xl">
          <div className="py-5 px-6">
            <div className="flex justify-between items-center">
              <p className="font-bold leading-normal not-italic text-[22px]">
                Миний бүх газрууд
              </p>
              <AddPlaceButton
                categoryData={categoryData}
                setDataEffect={setDataEffect}
                dataEffect={dataEffect}
              />
            </div>
          </div>
          <div className="px-6 w-full h-full overflow-hidden">
            <div className="flex flex-col gap-6 w-full h-[90%] overflow-scroll">
              {placesData.map((data: TPlaces) => {
                return (
                  <AdminPlaceCard
                    key={`${data._id}${Date.now()}`}
                    image={data.image}
                    _id={data._id}
                    name={data.name}
                    category={data.category}
                    capacity={data.capacity}
                    description={data.description}
                    workingHours={data.workingHours}
                    location={data.location}
                    categoryData={categoryData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
