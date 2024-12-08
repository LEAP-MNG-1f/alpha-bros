"use client";

import { LocationIcon, PeopleIcon, SeatIcon } from "@/components/ui/icons";
import { spaceMeetingPlacesData } from "@/constant/mockdatas";
import { useParams } from "next/navigation";
import WorkingTimeCard from "./WorkingTimeCard";

export const SinglePage = () => {
  const params = useParams<{ place: string }>();
  const singleData = spaceMeetingPlacesData.filter((data) => {
    return data.id == params.place;
  });

  return (
    <>
      {singleData.map((data) => {
        return (
          <div className="bg-[#F9FBFC] w-full " key={data.id}>
            <div className="container mx-auto h-full">
              <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[646px]">
                <div
                  className="h-auto w-full rounded-2xl col-span-2 row-span-2"
                  style={{
                    background: `url(${data.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="h-auto rounded-2xl"
                  style={{
                    background: `url(${data.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="h-auto rounded-2xl"
                  style={{
                    background: `url(${data.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="h-auto rounded-2xl"
                  style={{
                    background: `url(${data.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="h-auto rounded-2xl"
                  style={{
                    background: `url(${data.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
              {/* ////////////////////////////////////////////////// */}
              <div className="flex justify-between mt-12 w-full">
                <div className="w-full">
                  <div className="pr-10 w-full">
                    <div className="flex bg-white border-[#e5e7eb] rounded-xl p-4 gap-6 w-full">
                      <div className=" flex flex-col gap-6  w-full">
                        <div className=" flex w-full justify-between">
                          <div className="py-1 px-[10px] bg-[#405FF212] rounded-full">
                            <p className="font-Poppins not-italic font-bold text-[#405FF2] text-xs">
                              {data.type}
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="font-Poppins font-semibold not-italic text-2xl">
                            {data.name}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <LocationIcon />
                          <p className="font-Inter not-italic font-medium text-base">
                            {data.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-10 h-10 bg-[#405FF212] rounded-[50%]">
                            <p className="">Г</p>
                          </div>
                          <p className="font-medium font-Inter text-lg text-[#6b7280]">
                            Customer by
                          </p>
                          <span className="font-medium font-Inter text-lg">
                            Гэрэлтбаатар
                          </span>
                        </div>
                        <div className="w-full border border-[#e5e7eb]"></div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <PeopleIcon />
                            <p className="font-Poppins text-base text-[#374151] not-italic ">
                              {data.capacity}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <SeatIcon />
                            <p className="font-Poppins text-base text-[#374151] not-italic ">
                              20
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* ///////////////////// */}
                      <div className="w-[400px]">
                        <div className="w-full font-Poppins font-semibold not-italic text-2xl ">
                          Hours
                        </div>
                        <div>
                          {Object.entries(data.workingHours).map(
                            ([day, hours]) => (
                              <div key={day}>
                                {
                                  <WorkingTimeCard
                                    day={
                                      day.charAt(0).toUpperCase() + day.slice(1)
                                    }
                                    open={hours.open}
                                    close={hours.close}
                                  />
                                }
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-12 pr-10">
                      <div className="bg-white flex flex-col gap-6 p-4  w-full border border-[#e5e7eb] rounded-xl">
                        <p className="font-Poppins font-semibold not-italic text-2xl">
                          {data.ambiance}
                        </p>
                        <div className="border border-[e5e7eb] w-16"></div>
                        <p className="font-Poppins text-base text-[#374151] not-italic">
                          {data.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-[#e5e7eb] max-w-[600px] h-[400px] w-full p-4 rounded-xl shadow-lg"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

{
  /*
  <div className=" container  mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
    <div className="lg:col-span-2 rounded-lg overflow-hidden shadow">
        <img
          src="https://via.placeholder.com/800x600"
          alt="Large Property Image"
          className="w-full h-[500px] object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden shadow">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Small Property Image 1"
            className="w-full h-[240px] object-cover"
          />
        </div>

        <div className="rounded-lg overflow-hidden shadow">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Small Property Image 2"
            className="w-full h-[240px] object-cover"
          />
        </div>

        <div className="rounded-lg overflow-hidden shadow">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Small Property Image 3"
            className="w-full h-[240px] object-cover"
          />
        </div>

        <div className="rounded-lg overflow-hidden shadow">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Small Property Image 4"
            className="w-full h-[240px] object-cover"
          />
        </div>
      </div>
    </div>
    <div className="flex">
      <div className="flex flex-col">
        <div className="mt-8 shadow w-[800px]  rounded-lg">
          <div className="p-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Beach House in Collingwood
              </h1>
              <p className="text-gray-500 mt-2 flex items-center">
                <span className="text-yellow-500 flex items-center">★ 4.5</span>
                <span className="ml-2">(112 reviews)</span>

                <span className="mx-2">·</span>
                <span>Tokyo, Japan</span>
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"></div>
              <p className="text-black">Hosted by kevin francis</p>
            </div>

            <div className="flex items-center space-x-4 text-gray-700">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
                </svg>
                <span>6 Guests</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 10V7a3 3 0 013-3h6a3 3 0 013 3v3h3v7h-2v-2H3v2H1v-7h3zm2-3v3h8V7a1 1 0 00-1-1H7a1 1 0 00-1 1z" />
                </svg>
                <span>6 Beds</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 00-1 1v5H6a4 4 0 00-4 4v3h16v-3a4 4 0 00-4-4h-3V3a1 1 0 00-1-1zM4 13v1h12v-1a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>3 Bathrooms</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4zm-8 6a8 8 0 1116 0H2z" />
                </svg>
                <span>2 Bedrooms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 mt-6">
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg w-[800px] shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Stay Information
              </h2>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Providing lake views, The Symphony 9 Tam Coc in Ninh Binh
                provides accommodation, an outdoor swimming pool, a bar, a
                shared lounge, a garden, and barbecue facilities. Complimentary
                WiFi is provided.
              </p>
              <ul className="list-disc pl-5 mt-4 text-gray-700">
                <li>
                  Private bathroom with bidet, hairdryer, and free toiletries
                </li>
                <li>Bicycle and car rental service</li>
                <li>Outdoor terrace with lake view</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-8">
        <aside className=" w-[400px] flex  h-[400px]">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-xl font-semibold text-gray-900">
              $119 <span className="text-gray-500">/ night</span>
            </div>
            <p className="text-gray-500 mt-2">4 Guests · 2 Bedrooms</p>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold text-gray-900">
              Hosted by Kevin Francis
            </h3>
            <p className="text-gray-500 mt-2">
              Typically responds within 1 hour.
            </p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-md shadow hover:bg-purple-700">
              Reserve
            </button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</main>; */
}
