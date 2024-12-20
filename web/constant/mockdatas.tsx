export const BACKEND_ENDPOINT = "http://localhost:8000";
// export const BACKEND_ENDPOINT = process.env.API_KEY;

export const FooterData = {
  phoneNumber: "(976) 9911 7505",
  mail: "Lighthousemongol@gmail.com",
  address:
    "СБД, 1-р хороо, Чингисийн өргөн чөлөө, Гурван гол оффис центр 3 давхар",
  year: "2024",
};

export const date = new Date();
export const today = `${date.getFullYear()}-${
  date.getUTCMonth() + 1
}-${date.getDate()}-ны өдөр`;
const hour = date.getHours();
const min = date.getMinutes();
export const weekDay = date.getDay().toString();
export const Now = `${hour.toString().padStart(2, "0")}:${min
  .toString()
  .padStart(2, "0")}`;

export type TDistributor = {
  id: number;
  name: string;
  nameId: string;
};

export const categoryMockData: TDistributor[] = [
  { id: 1, name: "Зоог", nameId: "FOOD" },
  { id: 2, name: "Уулзах", nameId: "Meeting" },
  { id: 3, name: "Болзоо", nameId: "Dating" },
  { id: 4, name: "Хөгжилдөх", nameId: "Enjoy" },
  { id: 5, name: "Сургалт", nameId: "Seminar" },
  { id: 6, name: "Дасгал", nameId: "Training" },
  { id: 7, name: "Хүрээлэлээ тэлэх", nameId: "Networking" },
];

export type TWorkingHours = {
  open: string;
  close: string;
};

export type District = {
  id: number;
  name: string;
  idName: string;
};

export const districts: District[] = [
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

///////////////////////////////////////////////////////////////////////////////

export function dateGenerate(e: string) {
  const dateString = e;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const now = `${year}-${month}-${day} ${hour}:${minute}`;
  return now;
}
