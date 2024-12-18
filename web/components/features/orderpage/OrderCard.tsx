import { dateGenerate } from "@/constant/mockdatas";
import { TOrderType } from "@/types/DataTypes";

export const OrderCard = ({ order }: { order: TOrderType }) => {
  return (
    <div className="border px-4 py-2 rounded-xl grid grid-cols-4 gap-4">
      <div
        className="text-md flex items-center justify-center text-center"
        title={order._id}
      >
        {order._id.slice(-4)}
      </div>
      <div className="text-md flex items-center justify-center text-center">
        {dateGenerate(order.orderDate)}
      </div>
      <div className="text-md flex items-center justify-center text-center">
        {order.people}
      </div>
      <div className="text-md flex items-center justify-center text-center">
        {order.process}
      </div>
    </div>
  );
};
