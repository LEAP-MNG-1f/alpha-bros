import { TPlaces } from "@/types/DataTypes";
import { PhoneIcon, UsersIcon } from "lucide-react";
import WorkingTimeCard from "../singlePage/WorkingTimeCard";
import { ClosedDay } from "../singlePage/ClosedDay";

export const PlaceInformation = ({ placeData }: { placeData: TPlaces[] }) => {
  console.log(placeData);

  return (
    <div>
      {placeData.map((data) => {
        return (
          <div
            className="h-full w-full rounded-xl  bg-MainWhite shadow-2xl p-6 grid grid-cols-2 gap-4"
            key={data._id}
          >
            <img
              src={data.image[0]}
              alt="image"
              className="w-full h-full rounded-xl"
            />
            <div className="w-full bg-MainBlue rounded-lg p-4 flex flex-col gap-3">
              <div className="text-xs">{data.category.name}</div>
              <h1 className="text-2xl">{data.name}</h1>
              <div className="flex gap-1 justify-center items-center">
                <PhoneIcon />
                Утасны дугаар : {data.phoneNumber}
              </div>
              <div className="flex gap-2">
                <UsersIcon />
                Хүний багтаамж : {data.capacity}
              </div>
              <WorkingTimeCard
                day="Ажлын өдөр"
                open={data.workingHours.weekdays.open}
                close={data.workingHours.weekdays.close}
              />
              <WorkingTimeCard
                day="Амралтын өдөр"
                open={data.workingHours.weekend.open}
                close={data.workingHours.weekend.close}
              />
              {data.workingHours.closedDay && (
                <div className="flex">
                  <div>Амралтын өдөр : </div>
                  <ClosedDay closedDay={data.workingHours.closedDay} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
