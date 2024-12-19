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
import { TOrderType, TPlaces } from "@/types/DataTypes";
import { Loader } from "../layout/Loader";

export default function OrderPage() {
  const [orderData, setOrderData] = useState<TOrderType[]>([]);
  const [placeData, setPlaceData] = useState<TPlaces[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useAuth();
  const router = useRouter();

  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/api/userorder/${userId}`
      );
      const result = await response.json();
      setOrderData(result.data.OrderData);

      setPlaceData((prev) => [...prev, result.data.LatestData.placeId]);
      toast.success("Order data loaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="h-screen w-screen flex justify-center">
      <div className="container grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 mt-28  ">
        <div className="row-span-2">
          <OrderInformation orderData={orderData} />
        </div>
        <PlaceInformation placeData={placeData} />
        <ComingSoon />
      </div>
    </main>
  );
}
