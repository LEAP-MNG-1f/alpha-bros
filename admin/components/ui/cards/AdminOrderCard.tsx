export const AdminOrderCard = () => {
  return (
    <div className="flex justify-between border border-spacing-x-7 rounded-lg">
      <div className="px-6 py-4 flex w-[260px] items-start gap-2">
        <div className="w-[60px] h-[60px] border border-black rounded">
          zurag
        </div>
        <div className="h-full flex flex-col justify-center">
          <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
            place phone number
          </p>
          <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
            place name
          </p>
        </div>
      </div>
      <div className="px-6 py-4 flex items-start justify-center flex-col w-[330px]">
        <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
          Gmail - <span className="">mglgerelt@gmail.com</span>
        </p>
        <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
          Нэр - <span className="">Гэрэлтбаатар</span>
        </p>
      </div>
      <div className="px-6 py-4 flex items-start justify-center flex-col w-[230px]">
        <p className="text-black font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
          Хүний тоо - <span className="">10</span>
        </p>
        <p className="text-[#3F4145] font-Inter text-sm font-normal leading-[16px] tracking-[-0.12px]">
          2024/09/17 17:40
        </p>
      </div>
      <div className="px-6 py-4 flex items-center w-[200px]">
        <p className="text-[#3F4145] font-Inter text-sm font-semibold leading-[16px] tracking-[-0.12px]">
          Place state
        </p>
      </div>
      <div className="px-6 py-4 flex items-center">
        <div className="w-5 h-5"></div>
      </div>
    </div>
  );
};
