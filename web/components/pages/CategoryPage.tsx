"use client";
import MainCard from "@/components/ui/cards/MainCard";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { TPlaces } from "@/types/DataTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Places } from "../features/categorysinglepage/Places";
import { CategoryMap } from "../features/categorysinglepage/CategoryMap";

export default function CategoryPage() {
  const [data, setData] = useState<TPlaces[]>([]);
  const params = useParams();
  const categoryName = params.categorysearch;

  const fetchdata = async () => {
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/api/selected?categorizedPlaces=${categoryName}`
      );
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      throw new Error();
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <main className="w-screen flex  justify-center">
      <div className="max-w-screen-xl container grid grid-cols-2 gap-4">
        <Places data={data} />
        <CategoryMap places={data} />
      </div>
    </main>
  );
}
