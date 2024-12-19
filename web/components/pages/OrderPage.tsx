"use client";
import { useAuth } from "@clerk/nextjs";
import {
  ComingSoon,
  OrderInformation,
  PlaceInformation,
} from "../features/orderpage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BACKEND_ENDPOINT } from "@/constant/mockdatas";
import { TPlaces } from "@/types/DataTypes";

export default function OrderPage() {
  const [orderData, setOrderData] = useState([]);
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [placeId, setPlaceId] = useState<string>("");
  const { userId } = useAuth();
  const router = useRouter();

  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/api/userorder/${userId}`
      );
      const result = await response.json();
      if (result.success === true) setOrderData(result.data);
      setPlaceId(result.data.pop().placeId);

      toast.success("Order data loaded successfully!");
    } catch (error: any) {
      setError(error.message || "Failed to fetch order data.");
      toast.error(error.message || "An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceData = async () => {
    if (placeId === undefined) {
      console.log("placeid", placeId);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/api/places`);
      const result = await response.json();
      const datas = result.data;
      setPlaceData(datas);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchOrderData();
    fetchPlaceData();
  }, [userId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen flex justify-center">
      <div className="max-w-screen-xl container grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
        <div className="row-span-2">
          <OrderInformation orderData={orderData} />
        </div>
        <PlaceInformation placeData={placeData} />
        <ComingSoon />
      </div>
    </main>
  );
}
