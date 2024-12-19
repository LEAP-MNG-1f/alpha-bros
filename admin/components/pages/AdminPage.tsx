"use client";

import { useEffect, useState } from "react";
import { AdminPageZone } from "../features/AdminHome";
import { TPlaces } from "@/data/DataTypes";
import { TCategories } from "@/data/DataTypes";
import { useIdContext } from "../context/Context";

const AdminPage = () => {
  const [placesData, setPlacesData] = useState<TPlaces[]>([]);
  const [categoryData, setCategoryData] = useState<TCategories[]>([]);
  const [dataEffect, setDataEffect] = useState<boolean>(false);

  const BACKEND_END_POINT = process.env.BACKEND_URL;

  console.log(placesData, " placesData");

  const { deletedId } = useIdContext();

  const fatchData = async () => {
    try {
      const response = await fetch(`${BACKEND_END_POINT}/places`);
      const responseData = await response.json();
      const data = responseData.data;
      setPlacesData(data);
    } catch (e) {
      console.log("error", e);
    }
  };
  console.log("deletedId:", deletedId);

  const fetchDataCategory = async () => {
    try {
      const response = await fetch(`${BACKEND_END_POINT}/category`);
      const responseData = await response.json();
      const data = responseData.data;
      setCategoryData(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fatchData();
    fetchDataCategory();
  }, [dataEffect, deletedId]);

  return (
    <main className="h-screen w-screen bg-slate-100">
      <AdminPageZone
        placesData={placesData}
        categoryData={categoryData}
        setDataEffect={setDataEffect}
        dataEffect={dataEffect}
      />
    </main>
  );
};

export default AdminPage;
