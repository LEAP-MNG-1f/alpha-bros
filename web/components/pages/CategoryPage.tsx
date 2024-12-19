"use client";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { TPlaces } from "@/types/DataTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Places } from "../features/categorysinglepage/Places";
import { CategoryMap } from "../features/categorysinglepage/CategoryMap";
import { NoSearchItem } from "../layout/NoSearchItem";
import { Loader } from "../layout/Loader";

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
    return <Loader />;
  }

  if (data.length == 0) {
    return <NoSearchItem name="/" />;
  }
  return (
    <main className="w-screen flex justify-center">
      <div className="container grid grid-cols-2 gap-4 mt-28">
        <Places data={data} />
        <CategoryMap places={data} />
      </div>
    </main>
  );
}
