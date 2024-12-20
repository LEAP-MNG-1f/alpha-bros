import MainCard from "@/components/ui/cards/MainCard";
import { TPlaces } from "@/types/DataTypes";
type PropsRecommendSpaces = {
  data: TPlaces[];
};
export const RecommendedSpaces = ({ data }: PropsRecommendSpaces) => {
  return (
    <div className="container mx-auto w-screen flex flex-col gap-10 my-20 justify-center items-center">
      <h1 className="text-2xl font-bold not-italic">
        Үнэлгээ өндөртэй газрууд
      </h1>
      <div className="w-full lg:flex sm:grid  sm:grid-cols-4 lg:justify-between gap-7">
        {data.slice(0, 4).map((data: TPlaces) => {
          return (
            <MainCard
              key={data._id}
              image={data.image}
              _id={data._id}
              name={data.name}
              ambiance={data.ambiance}
              category={data.category}
              capacity={data.capacity}
              phoneNumber={data.phoneNumber}
              description={data.description}
              location={data.location}
              workingHours={data.workingHours}
            />
          );
        })}
      </div>
    </div>
  );
};
