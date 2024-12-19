"use client";

import { TPlaces } from "@/data/DataTypes";
import { EDButton } from "../buttons";
import { districts } from "../buttons";
import { Dispatch, SetStateAction } from "react";

export const AdminPlaceCard = (data: TPlaces) => {
  const districtData = data?.location?.district;

  const filterDistricts = districts.filter(
    (district) => district.idName === districtData
  );

  return (
    <div className="w-full border border-spacing-x-7 py-3 px-5 flex gap-2 justify-between rounded-lg">
      <div className="flex gap-3 items-center">
        <div
          className="w-20 h-20 rounded"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${data?.image[0]})`,
          }}
        ></div>
        <div className="w-[400px] ">
          <p className="font-semibold text-lg not-italic leading-normal">
            {data?.name}
          </p>
          <p className="font-normal text-sm leading-normal not-italic text-[#272727] line-clamp-2">
            {data?.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-start">
        <div className="flex items-start">
          <p className="font-Inter text-sm font-semibold not-italic leading-5 tracking-[-0.28px] ">
            Төрөл:{" "}
            <span className="text-[#121316] font-normal">
              {data?.category?.name ? data?.category?.name : "Хоосоn"}
            </span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="font-Inter text-sm not-italic font-bold leading-[16px] tracking-[-0.14px]">
            Хүний багтаамж:{" "}
            <span className="text-[#121316] font-normal">{data?.capacity}</span>
          </p>
        </div>
      </div>
      <div className="w-60 flex flex-col justify-center">
        <p className="font-Inter text-sm font-semibold not-italic leading-5 tracking-[-0.28px] ">
          Хот, аймаг:{" "}
          <span className="text-[#121316] font-normal">
            {data?.location?.province
              ? data?.location?.province
              : "Хоосон байна"}
          </span>
        </p>
        <p className="font-Inter text-sm font-semibold not-italic leading-5 tracking-[-0.28px] ">
          Дүүрэг:{" "}
          <span className="text-[#121316] font-normal">
            {" "}
            {filterDistricts[0].name ? filterDistricts[0].name : "Хоосон байна"}
          </span>
        </p>
        <p className="font-Inter text-sm font-semibold not-italic leading-5 tracking-[-0.28px] ">
          Гудамж:{" "}
          <span className="text-[#121316] font-normal">
            {" "}
            {data?.location?.street ? data?.location?.street : "Хоосон байна"}
          </span>
        </p>
      </div>
      <div className="flex items-center p-2">
        <EDButton dataName={data?.name} dateID={data._id} />
      </div>
    </div>
  );
};
