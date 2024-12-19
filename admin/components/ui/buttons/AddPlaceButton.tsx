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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction, useState } from "react";
import { TCategories } from "@/data/DataTypes";
import { useFormik } from "formik";
import { PlaceImageType } from "@/data/DataTypes";
import { TDistrict } from "@/data/DataTypes";
import { restDayType } from "@/data/DataTypes";
import { AddImageIcon } from "../icons";
import * as Yup from "yup";
import { toast } from "sonner";
import { Map } from "./GoogleMap";

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

type AddPlaceButtonProps = {
  categoryData: TCategories[];
  setDataEffect: Dispatch<SetStateAction<boolean>>;
  dataEffect: boolean;
};

export const AddPlaceButton = ({
  categoryData,
  setDataEffect,
  dataEffect,
}: AddPlaceButtonProps) => {
  const [placeImages, setPlaceImages] = useState<PlaceImageType>({
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [districtData, setDistrictData] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [restDayData, setRestDayData] = useState("");
  const [loeder, setLoeder] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lng, setLng] = useState(106.9162924);
  const [lat, setLat] = useState(47.9186367);
  const BACKEND_END_POINT = process.env.BACKEND_URL;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files); // FileList-ийг массив болгох
      setPlaceImages({ images: fileArray });

      // Урьдчилсан харагдах байдлыг хадгалах
      const previewUrls: string[] = [];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewUrls.push(reader.result as string);

          // Бүх урьдчилсан харагдах байдлыг state-д хадгалах
          if (previewUrls.length === fileArray.length) {
            setImagePreviews([...previewUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  console.log("lat is:", lat);
  console.log("lng is:", lng);

  const validationSchema = Yup.object({
    name: Yup.string().required("ene name - iig bogoln uu"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      capacity: "",
      description: "",
      ambiance: "",
      province: "",
      street: "",
      weekdaysOpen: "",
      weekdaysClose: "",
      weekendOpen: "",
      weekendClose: "",
      phoneNumber: "",
    },
    onSubmit: async (value) => {
      const requestData = {
        ...value,
      };

      const formData = new FormData();
      formData.append("name", requestData.name);
      formData.append("capacity", requestData.capacity);
      formData.append("description", requestData.description);
      formData.append("ambiance", requestData.ambiance);
      formData.append("phoneNumber", requestData.phoneNumber);
      formData.append("province", requestData.province);
      formData.append("street", requestData.street);
      formData.append("weekdaysOpen", requestData.weekdaysOpen);
      formData.append("weekdaysClose", requestData.weekdaysClose);
      formData.append("weekendOpen", requestData.weekendOpen);
      formData.append("weekendClose", requestData.weekendClose);
      formData.append("latitude", String(lat));
      formData.append("longitude", String(lng));

      if (restDayData) {
        formData.append("closedDay", restDayData);
      }

      if (districtData) {
        formData.append("district", districtData);
      }

      if (categoryId) {
        formData.append("category", categoryId);
      }

      if (placeImages && placeImages.images) {
        placeImages.images.forEach((file) => {
          formData.append("image", file); // "images" нь сервер руу илгээх түлхүүр
        });
      }

      try {
        setLoeder(true);
        const response = await fetch(`${BACKEND_END_POINT}/places`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setIsDialogOpen(false);
        }
        // setPlaceImages((prev) => [...prev, []]);
        if (data.success == true) {
          setDataEffect(!dataEffect);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          toast("Амжилттай", {
            description: "Газар амжилттай нэмлээ",
            action: {
              label: "Хаах",
              onClick: () => console.log("ajilah"),
            },
          });
        }
        setLoeder(false);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div className="py-2 px-4 bg-SecondColor text-white rounded">
          <span className="font-normal leading-normal not-italic text-base">
            Газар нэмэх
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form action="" onSubmit={formik.handleSubmit}>
            <DialogTitle>
              <span className="font-bold leading-[130%] text-2xl">
                Газар үүсгэх
              </span>
            </DialogTitle>
            <DialogDescription>
              <span className="pt-1 pb-3">
                Шинэ газар үүсгэхийн тулд доорх талбаруудыг бөглөнө үү.
              </span>
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
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Нэр"
                      className="px-3 h-10 rounded-lg w-full"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {/* <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    /> */}
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="Хүний багтаамж"
                      className="px-3 h-10 rounded-lg w-full"
                      value={formik.values.capacity}
                      onChange={formik.handleChange}
                    />
                    <Input
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Тайлбар"
                      className="px-3 h-10 rounded-lg w-full"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    <Input
                      id="ambiance"
                      name="ambiance"
                      type="text"
                      placeholder="Нэмэлт"
                      className="px-3 h-10 rounded-lg w-full"
                      value={formik.values.ambiance}
                      onChange={formik.handleChange}
                    />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      placeholder="Холбогдох утасны дугаар"
                      className="px-3 h-10 rounded-lg w-full"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                    <Select
                      value={categoryId}
                      onValueChange={(value) => setCategoryId(value)}
                    >
                      <SelectTrigger className="w-full px-3 h-10 rounded-lg placeholder-gray-500">
                        <SelectValue placeholder="Ангилал" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryData.map((category) => {
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
                      <Select onValueChange={(value) => setRestDayData(value)}>
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
                    <Select onValueChange={(value) => setDistrictData(value)}>
                      <SelectTrigger className="w-full px-3 h-10 rounded-lg placeholder-gray-500">
                        <SelectValue placeholder="Дүүрэг" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => {
                          return (
                            <SelectItem
                              key={district?.idName}
                              value={district?.idName}
                              onClick={() => setDistrictData(district?.idName)}
                            >
                              {district?.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
                    <Map lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
                  </div>
                </TabsContent>
                <TabsContent value="Image" className="w-full h-full">
                  <div className="w-full h-full">
                    <p className="text-[#525252]  text-base font-bold text-center">
                      Газрын зураг аа нэмнэ үү
                    </p>

                    <input
                      type="file"
                      id="uploadFile1"
                      name="uploadFile1"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />

                    <label htmlFor="uploadFile1">
                      <div className="flex w-full overflow-hidden items-center justify-start">
                        {imagePreviews.length > 0 ? (
                          <div className="image-previews flex flex-wrap gap-2">
                            {imagePreviews.map((preview, index) => (
                              <img
                                className="w-[100px] h-[100px] object-contain border border-green-800 border-dashed"
                                key={index}
                                src={preview}
                                alt={`Preview ${index + 1}`}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-[100px] h-[100px] object-contain border border-green-800 border-dashed">
                            <AddImageIcon />
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex items-center justify-end gap-4 pt-6">
              <button
                type="button"
                className="p-2 text-SecondColor font-inter text-base font-bold"
                onClick={() => {
                  formik.resetForm();
                  setImagePreviews([]);
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
  );
};
//set90
