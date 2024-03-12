/* eslint-disable prettier/prettier */
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...agrs: ClassValue[]) => twMerge(clsx(...agrs));

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'IST'
})

export const formatDateFromMS = (ms: number) => dateFormatter.format(ms);