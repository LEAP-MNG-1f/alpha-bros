"use client";
import { categoryMockData } from "@/constant/mockdatas";
import { useRouter } from "next/navigation";

type DistributerTypeProps = {
  name: string;
  id: string;
};

export const DistributorCard = ({ name, id }: DistributerTypeProps) => {
  const router = useRouter();
  return (
    <main className="px-4 py-2 flex flex-col justify-center items-center gap-4 rounded-lg bg-MainWhite">
      <button
        onClick={() => {
          router.push(`/menu/${name}`);
        }}
      >
        {categoryMockData.find((data) => data.nameId === name)?.name}
      </button>
    </main>
  );
};
