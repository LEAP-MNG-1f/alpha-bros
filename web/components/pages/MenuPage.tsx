"use client";
import { TCategories, TPlaces } from "@/types/DataTypes";
import { Menu } from "../features/menupage/Menu";
import { useEffect, useState } from "react";
import { Loader } from "../layout/Loader";

export default function Menupage() {
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [places, setPlaces] = useState<TPlaces[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/category`
      );
      const result = await response.json();
      setCategories(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/places`
      );
      const result = await response.json();
      setPlaces(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchPlaces();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Menu places={places} categories={categories} />
    </div>
  );
}
