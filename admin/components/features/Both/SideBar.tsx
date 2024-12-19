"use client";

import {
  AdminIcon,
  DashboardIcon,
  LightHouseIcon,
} from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();
  return (
    <main>
      <div className="flex flex-col gap-10 max-w-[302px] w-[280px] h-full bg-MainWhite py-[26px] rounded-r-[30px]">
        <div className="flex items-end">
          <LightHouseIcon />
          <p className=" font-bold text-[22px] w-auto text-SecondColor not-italic leading-[norma]">
            LIGHT HOUSE
          </p>
        </div>
        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-col gap-6">
            <Link href={"/admin"}>
              <div
                className={`${
                  pathname === "/admin"
                    ? "border-SecondColor bg-SecondColor/60 text-MainWhite"
                    : " text-SecondColor border-MainWhite  bg-MainWhite"
                }   hover:border-SecondColor border border-r-0 py-2 px-3 rounded-l-full    duration-200 `}
              >
                <div className="flex items-center gap-2">
                  <AdminIcon pathname={pathname} path="/admin" />
                  <p className="font-bold text-sm leading-4 tracking-[-0.2px] w-full">
                    АДМИН
                  </p>
                </div>
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <div
                className={`${
                  pathname === "/dashboard"
                    ? "border-SecondColor bg-SecondColor/60 text-MainWhite"
                    : " text-SecondColor border-MainWhite  bg-MainWhite"
                } border hover:border-SecondColor border-r-0 py-2 px-3 rounded-l-full  duration-200`}
              >
                <div className="flex items-center gap-2">
                  <DashboardIcon pathname={pathname} path="/dashboard" />
                  <p className="font-bold text-sm leading-4 tracking-[-0.2px] w-full">
                    ХЯНАЛТЫН САМБАР
                  </p>
                </div>
              </div>
            </Link>
            {/* <div className="py-3 flex flex-col gap-10">
              <p className="font-bold text-[22px] not-italic leading-normal w-full">
                Category fillter
              </p>
              <div className="py-3">qdeWFR</div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};
