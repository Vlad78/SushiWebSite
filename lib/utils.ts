import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDecimal(number: number) {
  if ((number * 10) % 1 === 0) {
    return number.toFixed(1);
  }
  return number.toString();
}

export function getRandom1to10() {
  return Math.floor(Math.random() * 10)
}