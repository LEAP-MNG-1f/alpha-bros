"use client";
import { Input } from "@/components/ui/input";

import {
  FilterIcon,
  GuestsIcon,
  LocationIcon,
  SearchIcon,
} from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BACKEND_ENDPOINT,
  categoryMockData,
  districts,
} from "@/constant/mockdatas";
import { TCategories } from "@/types/DataTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Search = () => {
  const router = useRouter();
  // ////////////////////////////////////////////////////////
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<string>("");
  // //////////////////////////////////////////////////////////
  const [categories, setCategories] = useState<TCategories[]>([]);
  // //////////////////////////////////////////////////////////
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/api/category`);
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.log(`error:${error}`);
    }
  };
  const search = () => {
    const isNumber = parseInt(peopleCount);
    if (!isNaN(isNumber)) {
      router.push(
        `/searchedplaces?location=${location}&category=${category}&peoplecount=${peopleCount}`
      );
    } else {
      alert("Хүний тоогоо оруулна уу");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex items-center justify-center pt-[120px]">
      <div className="flex items-center justify-between bg-white  w-4/5 rounded-[50px]">
        <div className="flex items-center gap-3 py-6 px-12">
          <LocationIcon />
          {/* /////////////////////////////// */}

          <Select
            onValueChange={(value) => {
              setLocation(value);
            }}
          >
            <SelectTrigger className="w-[180px]  text-lg border-none font-semibold leading-7 not-italic text-[#333] outline-none">
              <SelectValue placeholder="Дүүрэг" className="" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((discrict) => {
                return (
                  <SelectItem
                    className="w-[220px] text-lg border-none font-medium leading-7  text-[#333] outline-none bg-MainWhite"
                    key={`${discrict?.name}` + discrict?.id + Date.now()}
                    value={discrict?.idName}
                    onClick={() => {
                      setLocation(discrict?.idName);
                    }}
                  >
                    {discrict.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {/* ////////////////////////////// */}
        </div>
        <div className="h-[44px] border-[0.5px] border-[#E5E7EB]"></div>
        <div className="flex items-center gap-3 py-6 px-12">
          {/* ////////////////////// */}
          <FilterIcon />
          <Select
            onValueChange={(value) => {
              setCategory(value);
            }}
          >
            <SelectTrigger className="w-[220px] text-lg  border-none font-medium leading-7 not-italic text-[#333]  outline-none">
              <SelectValue placeholder="Орчиноо сонгоно уу" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => {
                return (
                  <SelectItem
                    className="w-[180px] text-lg !border-none  leading-7 not-italic text-[#222] outline-none bg-MainWhite"
                    key={category._id}
                    value={category?.name}
                    onClick={() => {
                      setCategory(category?.name);
                    }}
                  >
                    {
                      categoryMockData.find(
                        (data) => data.nameId === category.name
                      )?.name
                    }
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {/* ?//////////////////// */}
        </div>
        <div className="h-[44px] border-[0.5px] border-[#E5E7EB]"></div>
        {/* //////////////////////////// */}
        <div className="flex items-center gap-3 py-6 px-4 ">
          <GuestsIcon />
          <Input
            className="text-[#333] w-[110px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
            type="number"
            placeholder="Хүний тоо"
            onChange={(e) => {
              setPeopleCount(e.target.value);
            }}
          />
        </div>
        {/* //////////////////// */}
        <div className="pl-[10px] pr-[10px]">
          <button
            onClick={search}
            className="w-16 h-16 bg-[#4F46E5] p-5 rounded-[50%]"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
