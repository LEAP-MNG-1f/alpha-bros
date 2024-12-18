"use client";
import { useEffect, useState } from "react";
import { Hero } from "../features/homepage/Hero";
import { CategorySection } from "../features/homepage/CategorySection";
import { RecommendedSpaces } from "../features/homepage/RecommendedSpaces";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { TCategories, TPlaces } from "@/types/DataTypes";

export default function HomePage() {
  const [fetchData, setFetchData] = useState<TPlaces[]>([]);
  const [categories, setCategory] = useState<TCategories[]>([]);
  const fetchdataFunc = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/api/places`);
      const result = await response.json();
      setFetchData(result.data);
    } catch (error) {
      throw new Error();
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/api/category`);
      const result = await response.json();
      setCategory(result.data);
    } catch (error) {
      throw new Error();
    }
  };
  useEffect(() => {
    fetchdataFunc();
    fetchCategory();
  }, []);

  return (
    <div className="w-screen flex flex-col">
      <Hero />
      <CategorySection categories={categories} />
      <RecommendedSpaces data={fetchData} />
    </div>
  );
}
