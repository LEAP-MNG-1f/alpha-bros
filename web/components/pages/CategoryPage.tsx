"use client";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { TPlaces } from "@/types/DataTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Places } from "../features/categorysinglepage/Places";
import { CategoryMap } from "../features/categorysinglepage/CategoryMap";
import Link from "next/link";
import { DistributorCard } from "../ui/cards/DistributorCard";

export default function CategoryPage() {
  const [data, setData] = useState<TPlaces[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const params = useParams();
  const categoryName = params.categorysearch;

  const fetchdata = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/api/selected?categorizedPlaces=${categoryName}`
      );
      const result = await response.json();
      setData(result.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      throw new Error();
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  if (loader) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p>Уншиж байна...</p>
      </div>
    );
  }

  if (data.length == 0) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
        <div>Хайлтын илэрц байхгүй байна.</div>
        <Link href={"/menu"}>
          <DistributorCard name="Буцах" id="" />
        </Link>
      </div>
    );
  }
  return (
    <main className="w-screen flex  justify-center">
      <div className="max-w-screen-xl container grid grid-cols-2 gap-4">
        <Places data={data} />
        <CategoryMap places={data} />
      </div>
    </main>
  );
}
