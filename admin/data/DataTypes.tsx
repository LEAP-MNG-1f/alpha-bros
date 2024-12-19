import { Dispatch, SetStateAction } from "react";

export type HeaderButtonTypes = {
  text?: string;
  pathname?: string;
  path?: string;
};

export type DashboardIconType = {
  pathname?: string;
  path?: string;
};

export type CreateSpaseType = {
  name?: string;
  title?: string;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  id?: string;
  placeholder?: string;
};

export type TSpaceMeetingPlace = {
  _id: number;
  image: string;
  name: string;
  catergory?: "Meeting" | "Dating";
  capacity: number;
  description: string;
  location: "objectid";
  ambiance?: string;
  workingHours: {
    // monday: TWorkingHours;
    // tuesday: TWorkingHours;
    // wednesday: TWorkingHours;
    // thursday: TWorkingHours;
    // friday: TWorkingHours;
    // saturday: TWorkingHours;
    // sunday: TWorkingHours;
  };
};

export type PlaceImageType = {
  images: File[] | null;
};

export type PathType = {
  id: number;
  name: string;
  path: string;
};

export type TCategories = {
  _id: string;
  name: string;
  icon?: string;
};

export type TWorkingHours = {
  open: string;
  close: string;
};
export type TWeeklyhours = {
  monday: TWorkingHours;
  tuesday: TWorkingHours;
  wednesday: TWorkingHours;
  thursday: TWorkingHours;
  friday: TWorkingHours;
  saturday: TWorkingHours;
  sunday: TWorkingHours;
};

export type TLocation = {
  _id: string;
  district: string;
  latitude: string;
  longitude: string;
  province: string;
  street: string;
};

export type TPlaces = {
  _id: string;
  name: string;
  description: string;
  ambiance?: string;
  capacity: number;
  image: string[];
  phoneNumber?: string;
  category: TCategories;
  location?: TLocation;
  workingHours: TWeeklyhours;
  categoryData?: TCategories[];
};

export type TDistrict = {
  id: number;
  name: string;
  idName: string;
};

export type restDayType = {
  valueRestDay: string;
  name: string;
};
export type TMap = google.maps.Map;
export type TSetLat = Dispatch<SetStateAction<number>>;
export type TSetLng = Dispatch<SetStateAction<number>>;
export type TContextType = {
  deletedId: string;
  setDeletedId: Dispatch<SetStateAction<string>>;
};

export type orderType = {
  _id: string;
  createdAt: string;
  orderDate: string;
  people: string;
  placeId: string;
  process: string;
  userId: string;
  __v: number;
};

///

export type TCategoriesEdit = {
  _id: string;
  name: string;
};

export type TWorkingHoursEdit = {
  open: string;
  close: string;
};
export type TWeekhoursEdit = {
  weekdays: TWorkingHours;
  weekend: TWorkingHours;
  closedDay?: string;
};

export type TLocationEdit = {
  _id: string;
  district: string;
  latitude: string;
  longitude: string;
  province: string;
  street: string;
};

export type TPlacesEdit = {
  _id: string;
  name: string;
  description: string;
  ambiance?: string;
  capacity: number;
  image: string[];
  phoneNumber: string;
  category: TCategories;
  location: TLocation;
  workingHours: TWeekhoursEdit;
};
