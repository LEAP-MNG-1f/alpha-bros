import { SideBar } from "../Both";
import { DashboardContent } from "./DashboardContent";

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
interface DashboardPageZoneProps {
  orderData: Order[];
}
export const DashboardPageZone: React.FC<DashboardPageZoneProps> = ({
  orderData,
}) => {
  return (
    <main>
      <div className="w-full fixed z-40 h-full">
        <div className="container mx-auto h-full rounded-r-3xl">
          <div className="flex h-full">
            <SideBar />
            <DashboardContent orderData={orderData} />
          </div>
        </div>
      </div>
    </main>
  );
};
