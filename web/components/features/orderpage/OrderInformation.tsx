import { TOrderType } from "@/types/DataTypes";
import { OrderCard } from "./OrderCard";
import { today } from "@/constant/mockdatas";

export const OrderInformation = ({
  orderData,
}: {
  orderData: TOrderType[];
}) => {
  const reversedData = [...orderData].reverse();

  return (
    <div className="bg-MainWhite h-full rounded-xl p-6 shadow-2xl">
      <div className="w-full border-b p-2 mb-4 flex justify-between">
        <div className="text-2xl ">Захиалгын түүх</div>
        <div>{today}</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border px-4 py-2 rounded-xl grid grid-cols-4 gap-4">
          <div className="text-md flex items-center justify-center text-center">
            Захиалгын дугаар
          </div>
          <div className="text-md flex items-center justify-center text-center">
            Захиалгын огноо
          </div>
          <div className="text-md flex items-center justify-center text-center">
            Хүний тоо
          </div>
          <div className="text-md flex items-center justify-center text-center">
            Захиалгын төлөв
          </div>
        </div>
        {reversedData.map((order) => {
          return (
            <div key={order._id}>
              <OrderCard order={order} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
