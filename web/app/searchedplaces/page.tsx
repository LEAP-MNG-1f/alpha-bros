import { SearchedPage } from "@/components/pages/searchedPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <SearchedPage />;
    </Suspense>
  );
}
