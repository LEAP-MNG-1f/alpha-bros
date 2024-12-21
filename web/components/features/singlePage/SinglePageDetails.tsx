import { LocationIcon, PeopleIcon } from "@/components/ui/icons";
import { TPlaces } from "@/types/DataTypes";
import { PhoneCall, Share } from "lucide-react";
import { roboto700 } from "@/app/fonts/fonts";

export const SinglePageDetails = ({ data }: { data: TPlaces }) => {
  return (
<<<<<<< HEAD
    <div className="w-fill flex flex-col p-4 gap-2">
=======
    <div className="w-full flex flex-col p-4 gap-2">
>>>>>>> 9a184033085e19152e442274ec456e429b5ab6bf
      <div className="flex">
        <p className="not-italic font-bold text-[#405FF2] text-sm py-1 px-2 rounded bg-[#405FF212]">
          {data?.category?.name}
        </p>
      </div>
      <div className="w-full border-[0.5px]"></div>
      <p className=" font-bold not-italic text-2xl">{data?.name}</p>
      <div className="w-full border-[0.5px]"></div>
      <div className="flex gap-2 items-center">
        <LocationIcon />
        <p className="font-Inter not-italic font-medium text-base">
          {data.location?.district}
        </p>
      </div>
      <div className="w-full border-[0.5px]"></div>
      <div className="flex items-center">
        <PhoneCall color="#333" />
        <span className="font-medium font-Inter text-lg">
          +(976) - {data.phoneNumber}
        </span>
      </div>
      <div className="w-full border-[0.5px]"></div>
      <div className="flex items-center gap-2">
        <PeopleIcon />
        <p className=" text-base text-[#333] ">
          Хүний багтаамж -{" "}
          <span className={`${roboto700.className}`}>{data.capacity}</span>
        </p>
      </div>
      {/*  */}
    </div>
  );
};
