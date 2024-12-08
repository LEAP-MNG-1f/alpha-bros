import { AdminContent } from "./AdminContent";
import { SideBar } from "../Both";

export const AdminPageZone = () => {
  return (
    <main>
      <div className="w-full fixed z-40 h-full">
        <div className="container mx-auto  h-full rounded-r-3xl">
          <div className="flex w-full h-full">
            <SideBar />
            <AdminContent />
          </div>
        </div>
      </div>
    </main>
  );
};
