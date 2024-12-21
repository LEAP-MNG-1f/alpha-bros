import Link from "next/link";
import { Search } from "./Search";

export const Hero = () => {
  return (
    <main className="h-full w-screen">
      <div
        className="flex flex-col items-center justify-between w-full h-[860px] bg-MainColor rounded-b-[50px]"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://asset.cloudinary.com/dnbum0cg6/7e69af3b649cc84159d46c7101f669a9)",
        }}
      >
        <div className="container mx-auto">
          <div className="text-MainWhite pt-[180px]">
            <div className="flex flex-col gap-6 max-w-[559px]">
              <p className=" text-7xl not-italic font-semibold leading-[80px] text-MainWhite">
                Өөрт тохирох орчноо олцгооё
              </p>
              <p className="font-normal not-italic leading-normal text-xl text-MainWhite shadow-lg">
                Өөрсдийн дурсамжаа бүтээцгээе
              </p>
              <Link href={"/menu"}>
                <button className="w-32 px-4 py-2 bg-SecondColor rounded-lg">
                  <p className="text-sm not-italic font-bold">Хайж эхлэх</p>
                </button>
              </Link>
            </div>
            {/*  */}
            <Search />
            {/*  */}
          </div>
        </div>
        {/* <div className="w-full h-[80px] bg-slate-100 rounded-t-[60px]"></div> */}
      </div>
    </main>
  );
};
