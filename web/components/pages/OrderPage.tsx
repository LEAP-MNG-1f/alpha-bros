"use client";
import { useAuth } from "@clerk/nextjs";
import {
  ComingSoon,
  OrderInformation,
  PlaceInformation,
} from "../features/orderpage";

export default function OrderPage() {
  const { userId } = useAuth();
  console.log(userId);

  return (
    <main className="h-screen w-screen grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
      <div className="row-span-2">
        <OrderInformation />
      </div>
      <PlaceInformation />
      <ComingSoon />
    </main>
  );
}
