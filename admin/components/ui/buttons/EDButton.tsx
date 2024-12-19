"use client";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { EditIcon } from "../icons";
import { DeleteButtom } from "./DeleteButtom";
import { EditButton } from "./EditButton";
import { TCategories, TPlacesEdit } from "@/data/DataTypes";
import { useEffect, useState } from "react";
type EDButtonProps = {
  dataName: string;
  dateID: string;
  categoryData?: TCategories[];
};
export const EDButton = ({ dataName, dateID, categoryData }: EDButtonProps) => {
  const [place, setPlace] = useState<TPlacesEdit | undefined>(undefined);
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/places/${dateID}`
        );
        const result = await response.json();
        setPlace(result?.data);
      } catch (error) {
        throw new Error();
      }
    };
    fetchPlace();
  }, []);
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <EditIcon />
        </MenubarTrigger>
        <MenubarContent>
          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100">
            {place && categoryData && (
              <EditButton place={place} categories={categoryData} />
            )}
          </div>
          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100">
            <DeleteButtom dataName={dataName} dateID={dateID} />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
