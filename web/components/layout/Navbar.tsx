"use client";

import { LightTower } from "@/components/ui/icons/LightTower";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <div className="w-screen flex  justify-center py-2  text-gray-400 ">
      <div className="max-w-screen-xl container flex justify-between  items-center w-full">
        <div className="flex gap-4 justify-start">
          {paths.map((path) => (
            <button
              className="p-2 px-4"
              onClick={() => router.push(`${path.path}`)}
              key={path.id}
            >
              {path.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4">
          <SignedOut>
            <SignInButton>
              <button className="p-1 border border-green-500 rounded-md">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonBox: "bg-MainWhite rounded-x px-4 py-2 rounded-md ",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
