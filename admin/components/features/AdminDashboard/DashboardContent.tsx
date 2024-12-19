import { AdminOrderCard } from "@/components/ui/cards";
import { Header } from "../Both";

export const DashboardContent = () => {
  return (
    <main className="w-full h-[90%] pb-3">
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
          <div className="bg-MainWhite px-6 pt-2 w-full h-[85%] overflow-hidden">
            <div className="flex flex-col gap-6 w-full h-[100%] overflow-scroll">
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
              <AdminOrderCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
