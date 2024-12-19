"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { TCategories, TPlacesEdit } from "@/data/DataTypes";
import { useFormik } from "formik";
// import { PlaceImageType } from "@/data/DataTypes";
import { TDistrict } from "@/data/DataTypes";
import { restDayType } from "@/data/DataTypes";
import { AddImageIcon } from "../icons";
import * as Yup from "yup";
import { toast } from "sonner";
import { Map } from "./GoogleMap";
import Image from "next/image";
import { useIdContext } from "@/components/context/Context";
import { daySwitcher, imageUrlOptimizer } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export const districts: TDistrict[] = [
  { id: 1, name: "Сүхбаатар", idName: "Sukhbaatar" },
  { id: 2, name: "Чингэлтэй", idName: "chingeltei" },
  { id: 3, name: "Баянзүрх", idName: "baynzurkh" },
  { id: 4, name: "Баянгол", idName: "bayangol" },
  { id: 5, name: "Сонгино-Хайрхан", idName: "songino-khairkhan" },
  { id: 6, name: "Хан-уул", idName: "khan-uul" },
  { id: 7, name: "Налайх", idName: "nalaih" },
  { id: 8, name: "Багануур", idName: "baganuur" },
  { id: 9, name: "Багахангай", idName: "bagahangai" },
];

const restDays: restDayType[] = [
  { valueRestDay: "1", name: "Даваа" },
  { valueRestDay: "2", name: "Мягмар" },
  { valueRestDay: "3", name: "Лхагва" },
  { valueRestDay: "4", name: "Пүрэв" },
  { valueRestDay: "5", name: "Баасан" },
  { valueRestDay: "6", name: "Бямба" },
  { valueRestDay: "7", name: "Ням" },
];

export const EditButton = ({
  place,
  categories,
}: {
  place: TPlacesEdit;
  categories: TCategories[];
}) => {
  const { setDeletedId } = useIdContext();
  const [savedImages, setSavedImages] = useState<string[]>(place.image);
  const [placeImages, setPlaceImages] = useState<
    {
      id: number;
      file: File;
      url: string;
    }[]
  >([]);
  const [districtData, setDistrictData] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [restDayData, setRestDayData] = useState("");
  const [loeder, setLoeder] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lng, setLng] = useState(Number(place?.location?.longitude));
  const [lat, setLat] = useState(Number(place?.location?.latitude));
  const previousCategory = categories.find((c) => c._id == place.category._id);
  const BACKEND_END_POINT = process.env.BACKEND_URL;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPlaceImages((pre) => {
          return [{ id: pre.length, url: previewUrl, file: file }, ...pre];
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSavImageDel = async (imageUrl: string) => {
    const placeId = place._id;

    try {
      const res = await fetch(`${BACKEND_END_POINT}/image`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId,
          imageUrl,
        }),
      });
      if (res.status == 200) {
        toast("Амжилттай", {
          description: "Зураг амжилттай устгагдлаа.",
          action: {
            label: "Хаах",
            onClick: () => {},
          },
        });
        setSavedImages((pre) => {
          return pre.filter((data) => data !== imageUrl);
        });
        return;
      }
      if (res.status == 400) {
        toast("Хүсэлт дутуу", {
          description: "Хүсэлт дутуу учраас устгаж чадсангүй",
          action: {
            label: "Хаах",
            onClick: () => {},
          },
        });
        return;
      }
      if (res.status === 500) {
        toast("Server алдаа", {
          description: "",
          action: {
            label: "Хаах",
            onClick: () => {},
          },
        });
        return;
      }
    } catch (error) {
      toast("Frontedn алдаа", {
        description: "",
        action: {
          label: "Хаах",
          onClick: () => {},
        },
      });
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("ene name - iig bogoln uu"),
  });
  const formik = useFormik({
    initialValues: {
      name: place.name,
      capacity: place.capacity,
      description: place.description,
      ambiance: place.ambiance,
      province: place.location?.province,
      street: place.phoneNumber,
      weekdaysOpen: place?.workingHours?.weekdays.open,
      weekdaysClose: place?.workingHours?.weekdays.close,
      weekendOpen: place?.workingHours?.weekend.open,
      weekendClose: place?.workingHours?.weekend.close,
      phoneNumber: place?.phoneNumber,
    },
    onSubmit: async (value) => {
      try {
        const formData = new FormData();
        formData.append("name", value?.name);
        formData.append("capacity", String(value?.capacity));
        formData.append("description", value?.description);
        formData.append("ambiance", String(value?.ambiance));
        formData.append("phoneNumber", String(value?.phoneNumber));
        formData.append("province", String(value?.province));
        formData.append("street", value.street);
        formData.append("weekdaysOpen", value?.weekdaysOpen);
        formData.append("weekdaysClose", value?.weekdaysClose);
        formData.append("weekendOpen", value?.weekendOpen);
        formData.append("weekendClose", value?.weekendClose);
        formData.append("latitude", String(lat));
        formData.append("longitude", String(lng));
        formData.append("locationId", place.location._id);
        formData.append(
          "closedDay",
          restDayData || String(place?.workingHours?.closedDay)
        );
        formData.append(
          "district",
          districtData || String(place.location.district)
        );
        formData.append("category", categoryId || String(place.category._id));

        // formData.append("image", JSON.stringify(placeImages.images));
        if (placeImages.length > 0) {
          placeImages.forEach((file) => {
            formData.append("image", file.file); // "images" нь сервер руу илгээх түлхүүр
          });
        }
        setLoeder(true);

        const response = await fetch(
          `${BACKEND_END_POINT}/places/${place._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (response.status == 201) {
          toast("Амжилттай", {
            description: "Газар амжилттай заслаа",
            action: {
              label: "Хаах",
              onClick: () => {},
            },
          });
          setIsDialogOpen(false);
          setDeletedId(`${place?._id}${Date.now()}`);
          setLoeder(false);
          return;
        }
        if (response.status == 404) {
          toast("Not found", {
            action: {
              label: "Хаах",
              onClick: () => {},
            },
          });
          setLoeder(false);
          return;
        }
        if (response.status == 400) {
          toast("Unprocessable", {
            action: {
              label: "Хаах",
              onClick: () => {},
            },
          });
          setLoeder(false);
          return;
        }
        if (response.status == 500) {
          const data = await response.json();
          toast("Амжилтгүй", {
            description: `backend error: ${data.error}`,
            action: {
              label: "Хаах",
              onClick: () => {},
            },
          });
          setLoeder(false);
          return;
        }
      } catch (error) {
        toast("Амжилтгүй", {
          description: `front-end error: ${error}`,
          action: {
            label: "Хаах",
            onClick: () => {},
          },
        });
        setLoeder(false);
      }
    },
  });
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="w-full">
          <p className="w-full text-start">Засах</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <form action="" onSubmit={formik.handleSubmit}>
              <DialogTitle>
                <span className="font-bold leading-[130%] text-2xl">
                  Газар засах
                </span>
              </DialogTitle>
              <DialogDescription>
                <span className="pt-1 pb-3">Газар засах</span>
              </DialogDescription>
              <div className="flex gap-4 p-6 border border-[#E0E0E0] border-x-0 h-[430px] w-full">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="w-full flex">
                    <TabsTrigger value="Place">Газрын мэдээлэл</TabsTrigger>
                    <TabsTrigger value="Location">Байршил</TabsTrigger>
                    <TabsTrigger value="Image">Зураг</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Place" className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <Label className="flex gap-2 ">
                        <p className="flex justify-center items-center">Нэр</p>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Нэр"
                          className="px-3 h-10 rounded-lg w-[70%] overflow-scroll grow"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                        />
                      </Label>

                      <Label className="flex gap-2 ">
                        <p className="flex justify-center items-center">
                          Хүний багтаамж
                        </p>

                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          placeholder="Хүний багтаамж"
                          className="px-3 h-10 rounded-lg w-full"
                          value={formik.values.capacity}
                          onChange={formik.handleChange}
                        />
                      </Label>

                      <Label className="flex gap-2 ">
                        <p className="flex justify-center items-center">
                          Тайлбар
                        </p>
                        <Input
                          id="description"
                          name="description"
                          type="text"
                          placeholder="Тайлбар"
                          className="px-3 h-10 rounded-lg w-full"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                        />
                      </Label>

                      <Label className="flex gap-2 ">
                        <p className="flex justify-center items-center">
                          Нэмэлт
                        </p>
                        <Input
                          id="ambiance"
                          name="ambiance"
                          type="text"
                          placeholder="Нэмэлт"
                          className="px-3 h-10 rounded-lg w-full"
                          value={formik.values.ambiance}
                          onChange={formik.handleChange}
                        />
                      </Label>
                      <Label className="flex gap-2 ">
                        <p className="flex justify-center items-center">
                          Холбогдох утасны дугаар
                        </p>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          placeholder="Холбогдох утасны дугаар"
                          className="px-3 h-10 rounded-lg w-full"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                        />
                      </Label>

                      <Label className="flex gap-2 ">
                        <div className="flex flex-col gap-1">
                          <p className="text-[#6B7280]">Өмнөх:</p>
                          <p className="">{previousCategory?.name}</p>
                        </div>
                        <Select
                          value={categoryId}
                          onValueChange={(value) => setCategoryId(value)}
                        >
                          <SelectTrigger className="w-full px-3 h-10 rounded-lg placeholder-gray-500">
                            <SelectValue placeholder="Ангилал" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => {
                              return (
                                <SelectItem
                                  key={category?._id}
                                  value={category?._id}
                                >
                                  {category?.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </Label>
                    </div>
                    <div className="px-4 flex flex-col gap-4">
                      <div className="flex flex-col">
                        <p className=" text-base font-bold text-center">
                          Ажлын өдрүүд
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-2">
                            <label
                              className="w-full text-sm font-medium not-italic leading-[140%] flex items-center justify-center"
                              htmlFor="weekdaysOpen"
                            >
                              Нээх цаг
                            </label>
                            <Input
                              type="time"
                              id="weekdaysOpen"
                              className="px-3 h-10 rounded-lg w-auto"
                              {...formik.getFieldProps("weekdaysOpen")}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label
                              className="w-full text-sm font-medium not-italic leading-[140%] flex items-center justify-center"
                              htmlFor="weekdaysClose"
                            >
                              Хаах цаг
                            </label>
                            <Input
                              type="time"
                              id="weekdaysClose"
                              className="px-3 h-10 rounded-lg w-auto"
                              {...formik.getFieldProps("weekdaysClose")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className=" text-base font-bold text-center">
                          Амралтын өдрүүд
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-2">
                            <label
                              className="w-full text-sm font-medium not-italic leading-[140%] flex items-center justify-center"
                              htmlFor="weekendOpen"
                            >
                              Нээх цаг
                            </label>
                            <Input
                              type="time"
                              id="weekendOpen"
                              className="px-3 h-10 rounded-lg w-auto"
                              {...formik.getFieldProps("weekendOpen")}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label
                              className="w-full text-sm font-medium not-italic leading-[140%] flex items-center justify-center"
                              htmlFor="weekendClose"
                            >
                              Хаах цаг
                            </label>
                            <Input
                              type="time"
                              id="weekendClose"
                              className="px-3 h-10 rounded-lg w-auto"
                              {...formik.getFieldProps("weekendClose")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="w-full text-black  text-base font-bold text-center">
                          Амрах өдөр
                        </p>
                        <Label className="flex gap-2 ">
                          <div className="flex flex-col gap-1">
                            <p className="text-[#6B7280]">Өмнөх:</p>
                            <p>{daySwitcher(place.workingHours.closedDay)}</p>
                          </div>
                          <Select
                            onValueChange={(value) => setRestDayData(value)}
                          >
                            <SelectTrigger className="w-full px-3 h-10 rounded-lg placeholder-gray-500">
                              <SelectValue placeholder="Өдрөө сонгоно уу" />
                            </SelectTrigger>
                            <SelectContent>
                              {restDays.map((restDay) => {
                                return (
                                  <SelectItem
                                    key={restDay?.name}
                                    value={restDay?.valueRestDay}
                                  >
                                    {restDay?.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="Location"
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex flex-col gap-4">
                      <Input
                        id="province"
                        name="province"
                        type="text"
                        placeholder="Хот, аймаг"
                        className="px-3 h-10 rounded-lg w-full"
                        value={formik.values.province}
                        onChange={formik.handleChange}
                      />
                      <Label className="flex gap-2 ">
                        <div className="flex flex-col gap-1">
                          <p className="text-[#6B7280]">Өмнөх:</p>
                          <p className="">{place.location.district}</p>
                        </div>
                        <Select
                          onValueChange={(value) => setDistrictData(value)}
                        >
                          <SelectTrigger className="w-full px-3 h-10 rounded-lg placeholder-gray-500">
                            <SelectValue placeholder="Дүүрэг" />
                          </SelectTrigger>
                          <SelectContent>
                            {districts.map((district) => {
                              return (
                                <SelectItem
                                  key={district?.idName}
                                  value={district?.idName}
                                  onClick={() =>
                                    setDistrictData(district?.idName)
                                  }
                                >
                                  {district?.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </Label>
                      <Input
                        id="street"
                        name="street"
                        type="text"
                        placeholder="Гудамж"
                        className="px-3 h-10 rounded-lg w-full"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="">
                      <Map
                        lat={lat}
                        lng={lng}
                        setLat={setLat}
                        setLng={setLng}
                      />
                    </div>
                  </TabsContent>
                  {/* <p className="text-[#525252]  text-base font-bold text-center">
                      Газрын зураг аа нэмнэ үү
                    </p> */}

                  <TabsContent
                    value="Image"
                    className="w-full h-full max-w-[680px] flex gap-2 overflow-y-scroll px-3"
                  >
                    <label
                      htmlFor="uploadFile1"
                      className="flex flex-col flex-shrink-0 items-center justify-center w-[250px] h-[300px] object-contain border border-green-800 border-dashed"
                    >
                      <AddImageIcon />
                      <input
                        type="file"
                        id="uploadFile1"
                        name="uploadFile1"
                        className="hidden"
                        // multiple
                        onChange={handleFileChange}
                      />
                    </label>
                    {placeImages.length > 0 && (
                      <>
                        {placeImages.map((preview, index) => (
                          <div className="relative w-[250px] h-[300px] flex-shrink-0">
                            <Image
                              className="  border border-green-800 border-dashed "
                              key={index}
                              src={preview.url}
                              alt={`Preview ${index + 1}`}
                              fill
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPlaceImages((pre) => {
                                  return pre.filter(
                                    (img) => img.id !== preview.id
                                  );
                                });
                              }}
                            >
                              <Trash2 className="text-red-800 top-5 right-5 z-20 absolute hover:backdrop-blur-sm" />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                    {savedImages.length > 0 && (
                      <>
                        {savedImages.map((preview, index) => (
                          <div className="relative w-[250px] h-[300px] flex-shrink-0">
                            <Image
                              className="  border border-green-800 border-dashed "
                              key={index}
                              src={imageUrlOptimizer(preview)}
                              alt={`Preview ${index + 1}`}
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              fill
                            />
                            {savedImages.length > 1 && (
                              <button
                                type="button"
                                onClick={async () => {
                                  await handleSavImageDel(preview);
                                }}
                              >
                                <Trash2 className="text-red-800 top-5 right-5 z-20 absolute hover:backdrop-blur-sm" />
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex items-center justify-end gap-4 pt-6">
                <button
                  type="button"
                  className="p-2 text-SecondColor font-inter text-base font-bold"
                  onClick={() => {
                    formik.resetForm();
                    setPlaceImages([]);
                  }}
                >
                  Арилгах
                </button>
                <div>
                  {loeder === false ? (
                    <button
                      type="submit"
                      className="flex px-4 py-2 min-w-[145px] rounded-[4px] bg-SecondColor text-white font-inter text-base font-bold"
                    >
                      Үргэлжлүүлэх
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center justify-center px-4 py-2 min-w-[145px] rounded-[4px] bg-SecondColor/70 text-white font-inter text-base font-bold"
                    >
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-4 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
