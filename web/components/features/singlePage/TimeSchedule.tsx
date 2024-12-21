import { TWeekhours, TWorkingHours } from "@/types/DataTypes";
import { ClosedDay } from "./ClosedDay";
import WorkingTimeCard from "./WorkingTimeCard";
import { roboto } from "@/app/fonts/fonts";
import { Clock } from "lucide-react";

export const TimeSchedule = ({
  workingHours,
}: {
  workingHours: TWeekhours;
}) => {
  return (
    <div className="w-[300px]  h-full flex flex-col p-4 rounded-2xl text-sm ">
      <div className="flex flex-wrap text-xl gap-5">
        <div className="flex items-center gap-2 w-full font-semibold not-italic">
          <Clock className="text-[#6B7280]" />
          <p>Цагийн хуваарь</p>
        </div>
        <div className="flex flex-col">
          <div className={`${roboto.className} text-sm `}>Даваа-Баасан</div>
          <WorkingTimeCard
            open={workingHours.weekend.open}
            close={workingHours.weekdays.close}
          />
        </div>
        <div className="flex flex-col ">
          <div className={`${roboto.className} text-sm `}>Бямба-Ням</div>
          <WorkingTimeCard
            open={workingHours.weekend.open}
            close={workingHours.weekend.close}
          />
        </div>
        <div className="flex  flex-col gap-4">
          <div>
            {workingHours.closedDay && (
              <div>
                <div>Амралтын өдөр :</div>
                <ClosedDay closedDay={workingHours.closedDay} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
