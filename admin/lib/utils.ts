import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const daySwitcher = (number: string | undefined) => {
  switch (number) {
    case "1": {
      return "Даваа";
    }
    case "2": {
      return "Мягмар";
    }
    case "3": {
      return "Лхагва";
    }
    case "4": {
      return "Пүрэв";
    }
    case "5": {
      return "Баасан";
    }
    case "6": {
      return "Бямба";
    }
    case "7": {
      return "Ням";
    }
    default: {
      return "not found";
    }
  }
};
export function imageUrlOptimizer(url: string) {
  const arr = url.split("/upload");
  arr.splice(1, 0, "/upload/q_auto,f_auto");
  return arr.join("");
}
