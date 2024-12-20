import { TPlaces } from "@/types/DataTypes";
import { Order } from "./Order";
import { SinglePageDetails } from "./SinglePageDetails";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TimeSchedule } from "./TimeSchedule";
import { PlaceMap } from "./Map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type TSinglePageProps = {
  place: TPlaces[] | [];
};
export const PageBuild = ({ place }: TSinglePageProps) => {
  let CarouselCol = "";
  let CarouselW = "";

  if (place[0]?.image.length >= 2) {
    CarouselCol = "basis-1/2";
    CarouselW = "900px";
  } else {
    CarouselCol = "basis-1/1";
    CarouselW = "450px";
  }

  return (
    <div className="w-screen min-h-screen flex justify-center pt-28 ">
      {place.map((data) => {
        return (
          <div
            className="container h-[950px] flex flex-col gap-16 bg-MainWhite rounded-2xl p-5 "
            key={data._id}
          >
            <div className="w-full h-[300px] flex  justify-between">
              <div className="flex items-center h-full px-14">
                <Carousel className="max-w-[900px] h-full">
                  <CarouselContent className={`${CarouselW}`}>
                    {data.image.map((img, index) => (
                      <CarouselItem
                        className={`${CarouselCol} flex w-full h-[300px] items-center justify-center`}
                        key={data._id + "image" + index}
                      >
                        <div
                          className="rounded-lg object-cover w-[400px] h-full border"
                          style={{
                            backgroundSize: "cover",
                            backgroundImage: ` url('${img}')`,
                          }}
                        ></div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="border w-[400px] h-[300px] rounded-lg overflow-hidden shadow-lg">
                <PlaceMap key={data?._id} place={data} />
              </div>
            </div>
            <div className="h-full w-full flex justify-between gap-[100px] items-stretch">
              <div className="flex gap-5 h-[250px] justify-between items-stretch">
                <div className="flex h-[300px] shadow-lg border rounded-lg">
                  <div className="w-full">
                    <SinglePageDetails data={data} />
                  </div>
                  <div className="">
                    <TimeSchedule workingHours={data.workingHours} />
                  </div>
                </div>
                <div className="w-[500px]">
                  <Order placeId={data._id} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

{
  /* <div className="border border-black">
<TimeSchedule workingHours={data.workingHours} />
</div> */
}
