"use client";
import { useRouter } from "next/navigation";

type ButtonTypeProps = {
  name: string;
};

export const MainButton = ({ name }: ButtonTypeProps) => {
  const router = useRouter();
  return (
    <main className="px-4 py-2 flex flex-col justify-center items-center gap-4 rounded-lg bg-SecondColor">
      <button
        onClick={() => {
          router.push(`/menu`);
        }}
      >
        {name}
      </button>
    </main>
  );
};
