"use client";

import { TPlaces } from "@/types/DataTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainCard from "../ui/cards/MainCard";
import Link from "next/link";
import { NoSearchItem } from "../layout/NoSearchItem";
import { Loader } from "../layout/Loader";

export const SearchedPage = () => {
  const searchParams = useSearchParams();
  const [searchedData, setSearchedData] = useState<TPlaces[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // ///////////////////////////
  const location = searchParams.get("location");
  const category = searchParams.get("category");
  const peoplecount = searchParams.get("peoplecount");
  // ////////////////////////////

  const SearchedDataFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/selected?placesLocation=${location}&categorizedPlaces=${category}&capacity=${peoplecount}`
      );
      const result = await response.json();
      if (result.success == true) {
        setSearchedData(result.data);
        setLoading(false);
      } else {
        return searchedData;
      }
    } catch (error) {
      setLoading(false);
      throw new Error();
    } finally {
      setLoading(false);
    }
  };
  //////////////////////////////
  useEffect(() => {
    SearchedDataFetch();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (searchedData.length == 0) {
    return <NoSearchItem name="/" />;
  }

  return (
    <main className="w-screen min-h-screen flex pt-[65px]">
      <div className="mx-auto container grid grid-cols-4 gap-4">
        {searchedData &&
          searchedData.map((data: TPlaces) => {
            return (
              <div key={data._id + "searched"}>
                <MainCard
                  _id={data?._id}
                  name={data?.name}
                  description={data?.description}
                  capacity={data?.capacity}
                  phoneNumber={data.phoneNumber}
                  location={data?.location}
                  image={data?.image}
                  category={data?.category}
                  workingHours={data?.workingHours}
                />
              </div>
            );
          })}
      </div>
    </main>
  );
};
