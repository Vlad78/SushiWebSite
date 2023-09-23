import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function to1Decimal(number: number | string) {
  typeof number !== "number" ? (number = Number(number)) : "";
  return number.toFixed(1);
}

export function to2Decimal(number: number | string) {
  typeof number !== "number" ? (number = Number(number)) : "";
  return number.toFixed(2);
}

export function getRandom1to10() {
  return Math.floor(Math.random() * 10);
}
