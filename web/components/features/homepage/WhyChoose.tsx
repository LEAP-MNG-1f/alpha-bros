export const WhyChoose = () => {
  return (
    <main>
      <div className="container mx-auto my-20 flex flex-col gap-10">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold not-italic">
            Яагаад биднийг сонгох вэ?
          </h1>
        </div>
        <div className="">
          <div className="w-full lg:flex sm:grid  sm:grid-cols-4 lg:justify-between gap-7">
            <div className="bg-[#405FF212] rounded-2xl w-[300px] h-[200px]"></div>
            <div className="bg-[#405FF212] rounded-2xl w-[300px] h-[200px]"></div>
            <div className="bg-[#405FF212] rounded-2xl w-[300px] h-[200px]"></div>
            <div className="bg-[#405FF212] rounded-2xl w-[300px] h-[200px]"></div>
          </div>
        </div>
      </div>
    </main>
  );
};
