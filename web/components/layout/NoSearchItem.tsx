import Link from "next/link";
import { MainButton } from "../ui/buttons/MainButton";

export const NoSearchItem = ({ name }: { name: string }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <div>Хайлтын илэрц байхгүй байна.</div>
      <Link href={"/menu"}>
        <MainButton name="Бүх газрыг үзэх" />
      </Link>
    </div>
  );
};
