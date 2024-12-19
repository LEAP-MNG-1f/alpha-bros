// "use client";

// import { useEffect, useState } from "react";
// import { DashboardPageZone } from "../features/AdminDashboard/DashboardPageZone";

// interface Place {
//   image: string[];
//   name: string;
//   phoneNumber: string;
// }

// interface User {
//   emails: string;
//   first_name: string;
//   last_name: string;
// }

// interface Order {
//   placeId: Place;
//   userId: User;
//   process: string;
//   _id: string;
//   createdAt: string;
//   orderDate: string;
//   people: string;
//   __v: number;
// }

// const DashboardPage = () => {
//   const [orderData, setOrderData] = useState<Order[]>([]);

//   const BACKEND_END_POINT = process.env.BACKEND_URL;

//   const orderDataFetch = async () => {
//     try {
//       const response = await fetch(`${BACKEND_END_POINT}/order`);

//       const responseData = await response.json();
//       if (!responseData?.data) {
//         const data = responseData?.data?.map((order: any) => ({
//           ...order,
//           placeId: {
//             image: order.placeId.imag || [],
//             name: order.placeId.name || "",
//             phoneNumber: order.placeId.phoneNumber || "",
//           },
//           userId: {
//             emails: order.userId.emails || "",
//             first_name: order.userId.first_name || "",
//             last_name: order.userId.last_name || "",
//           },
//           people: Number(order.people) || 0,
//         }));

//         setOrderData(data);
//       }
//     } catch (error) {
//       console.error("failed to fetch order", error);
//     }
//   };
//   console.log("hello", orderData);
//   useEffect(() => {
//     orderDataFetch();
//   }, []);

//   return (
//     <main className="h-screen w-screen bg-slate-100">
//       <DashboardPageZone orderData={orderData} />
//     </main>
//   );
// };
// export default DashboardPage;
"use client";

import { useEffect, useState } from "react";
import { DashboardPageZone } from "../features/AdminDashboard/DashboardPageZone";

interface Place {
  image: string[];
  name: string;
  phoneNumber: string;
}

interface User {
  emails: string;
  first_name: string;
  last_name: string;
}

interface Order {
  placeId: Place;
  userId: User;
  process: "Батлагдсан" | "Цуцлагдсан" | "Хүлээгдэж Байна";
  _id: string;
  createdAt: string;
  orderDate: string;
  people: string;
  __v: number;
}

const DashboardPage = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const BACKEND_URL = process.env.BACKEND_URL;

  const orderDataFetch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/order`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData?.data) {
        const data = responseData.data.map((order: any) => ({
          ...order,
          placeId: {
            image: order.placeId?.image || [],
            name: order.placeId?.name || "",
            phoneNumber: order.placeId?.phoneNumber || "",
          },
          userId: {
            emails: order.userId?.emails || "",
            first_name: order.userId?.first_name || "",
            last_name: order.userId?.last_name || "",
          },
          people: Number(order.people) || 0,
        }));

        setOrderData(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    orderDataFetch();
  }, []);
  return (
    <main className="h-screen w-screen bg-slate-100">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      ) : (
        <DashboardPageZone orderData={orderData} />
      )}
    </main>
  );
};

export default DashboardPage;
