import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const hoursOptions = Array.from({ length: 24 }, (_, i) => {
	const hour = i.toString().padStart(2, "0");
	return { value: hour, label: hour };
});

export const minutesOptions = Array.from({ length: 60 }, (_, i) => {
	const minute = i.toString().padStart(2, "0");
	return { value: minute, label: minute };
});
