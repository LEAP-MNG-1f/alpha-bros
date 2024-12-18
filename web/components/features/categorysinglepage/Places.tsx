import MainCard from "@/components/ui/cards/MainCard";
import { TPlaces } from "@/types/DataTypes";

export const Places = ({ data }: { data: TPlaces[] }) => {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {data.map((data: TPlaces) => {
          return (
            <MainCard
              key={data._id}
              image={data.image}
              _id={data._id}
              name={data.name}
              phoneNumber={data.phoneNumber}
              category={data.category}
              capacity={data.capacity}
              description={data.description}
              location={data.location}
              workingHours={data.workingHours}
            />
          );
        })}
      </div>
    </main>
  );
};
