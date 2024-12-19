"use client";

import { LightTower } from "@/components/ui/icons/LightTower";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ProfileIcon } from "../ui/icons";

const paths = [
  {
    id: 1,
    name: "Нүүр хуудас",
    path: "/",
  },
  {
    id: 2,
    name: "Орчиноор хайх",
    path: "/menu",
  },
];
export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-full text-white fixed z-[2]">
      <div className="background filter">
        <div className="mx-auto container flex justify-between  items-center py-4 w-full">
          <div className="flex gap-4 justify-start">
            {paths.map((path) => (
              <button
                className={`px-2 py-1 not-italic font-bold text-sm ${
                  pathname === path.path ? "text-SecondColor" : "text-white"
                }`}
                onClick={() => router.push(`${path.path}`)}
                key={path.id}
              >
                {path.name}
              </button>
            ))}
          </div>
          <div className="flex">
            <LightTower />
            <p className=" font-bold text-[22px] w-auto text-SecondColor not-italic leading-[norma]">
              LIGHT HOUSE
            </p>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="w-[100px]"></div>
            <SignedOut>
              <SignInButton>
                <button className="group flex border hover:border-SecondColor border-white items-center px-2 rounded-lg duration-200">
                  <ProfileIcon fillHover="group-hover:fill-SecondColor duration-100" />
                  <div className="p-1 rounded-md not-italic group-hover:text-SecondColor duration-200 font-bold text-sm">
                    Нэвтрэх
                  </div>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: "rounded-x px-2 py-1 rounded-md ",
                    userButtonOuterIdentifier:
                      "not-italic font-bold text-sm text-SecondColor",

                    userButtonAvatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};
