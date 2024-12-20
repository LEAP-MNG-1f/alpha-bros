import { AdminOrderCard } from "@/components/ui/cards";
import { Header } from "../Both";

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

interface DashboardContentProps {
  orderData: Order[];
}
export const DashboardContent: React.FC<DashboardContentProps> = ({
  orderData,
}) => {
  return (
    <main className="w-[78.1%] h-[87%] pb-3">
      <Header />
      <div className="pl-8 pt-8 h-full">
        <div className="bg-white h-full rounded-xl">
          <div className="py-5 px-6 bg-MainWhite rounded-t-xl">
            <p className="text-[#121316]  font-bold leading-normal not-italic text-[22px]">
              Админ хяналтын самбар
            </p>
          </div>
          <div className="flex justify-between bg-slate-100 px-6">
            <div className="px-6 py-3 flex items-center w-[260px]">
              <p className="text-[#3F4145] font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px] ">
                Газрын мэдээлэл
              </p>
            </div>
            <div className="px-6 py-3 flex items-center w-[330px]">
              <p className="text-[#3F4145] font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px] ">
                Захиалагчийн мэдээлэл
              </p>
            </div>
            <div className="px-6 py-3 flex items-center w-[230px]">
              <p className="text-[#3F4145] font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px] ">
                Захиалгын мэдээлэл
              </p>
            </div>
            <div className="px-6 py-3 flex items-center w-[200px]">
              <p className="text-[#3F4145] font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]  ">
                Захиалгын төлөв
              </p>
            </div>
            <div className="px-6 py-3 flex items-center">
              <div className="w-5 h-5"></div>
            </div>
          </div>
          <div className="bg-MainWhite px-6 pt-2 w-full h-[85%] rounded-b-2xl overflow-hidden">
            <div className="flex flex-col gap-6 w-full h-[100%] overflow-scroll">
              {orderData.map((order) => (
                <AdminOrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
