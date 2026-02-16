import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Rule 5.1: Utility for merging Tailwind classes safely.
 * Prevents class conflicts and handles conditional logic.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}