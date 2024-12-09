"use client";
import { useEffect, useState } from "react";
import { Hero } from "../features/homepage/Hero";
import { LogoSection } from "../features/homepage/LogoSection";
import { RecommendedSpaces } from "../features/homepage/RecommendedSpaces";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { TPlaces } from "@/data/DataTypes";

export default function HomePage() {
  const [fetchData, setFetchData] = useState<TPlaces[]>([]);

  const fetchdataFunc = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/api/places`);
      const result = await response.json();
      setFetchData(result.data);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchdataFunc();
  }, []);
  return (
    <div className="w-screen flex flex-col justify-center">
      <Hero />
      <LogoSection />
      <RecommendedSpaces data={fetchData} />
    </div>
  );
}
