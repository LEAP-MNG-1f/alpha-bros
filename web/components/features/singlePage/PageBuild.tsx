import { TPlaces } from "@/types/DataTypes";
import { Order } from "./Order";
import { SinglePageDetails } from "./SinglePageDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TimeSchedule } from "./TimeSchedule";
import { PlaceMap } from "./Map";

type TSinglePageProps = {
  place: TPlaces[] | [];
};
export const PageBuild = ({ place }: TSinglePageProps) => {
  return (
    <div className="w-screen min-h-screen flex justify-center">
      {place.map((data) => {
        return (
          <div
            className="container h-screen bg-MainWhite rounded-2xl grid  grid-cols-3 grid-rows-2 p-10 gap-4 auto-cols-auto"
            key={data._id}
          >
            <div className="row-end-1">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {data.image.map((img, index) => (
                  <SwiperSlide key={data._id + "image" + index}>
                    <img
                      src={img}
                      alt={`Image ${data.name}`}
                      height={100}
                      width={100}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="row-end-1 rounded-lg overflow-hidden">
              <PlaceMap key={data?._id} place={data} />
            </div>
            <div className="row-span-2">
              <Order placeId={data._id} />
            </div>
            <div className="">
              <SinglePageDetails data={data} />
            </div>
            <div className="">
              <TimeSchedule workingHours={data.workingHours} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
