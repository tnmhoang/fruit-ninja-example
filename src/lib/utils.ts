import { UserPublic } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { twMerge } from 'tailwind-merge';
import * as _ from 'lodash';
import { IOrder, IOrderItem } from '@/types/order';
import { getDifficultyBorderHelper } from '@/helpers/getDifficultyBorderHelper';
dayjs.extend(duration);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shareTelegram(url: string) {
  const text = encodeURIComponent(
    `Join me on Doglibre and let's earn together! Click my invite link to get started! 👇\n\n${url}`,
  );
  return `https://telegram.me/share/url?url=%20&text=${text}`;
}

export function nFormatter(num: string | number | undefined, digits: number = 1) {
  if (num === undefined) return '';

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => +num >= item.value);
  return item ? (+num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol) : '0';
}

export const formatCurrency = (n: string | number | undefined, maxLengthOfDecimal = 2) => {
  if (n === null || n === undefined) return '-';
  const newNumber = Number(n);
  let formattedNumber;

  if (newNumber >= 1e9) {
    const valueInBillion = newNumber / 1e9;
    formattedNumber =
      Math.floor(valueInBillion * Math.pow(10, maxLengthOfDecimal)) /
      Math.pow(10, maxLengthOfDecimal);
  } else if (newNumber >= 1e6) {
    const valueInMillion = newNumber / 1e6;
    formattedNumber =
      Math.floor(valueInMillion * Math.pow(10, maxLengthOfDecimal)) /
      Math.pow(10, maxLengthOfDecimal);
  } else {
    formattedNumber =
      newNumber % 1 === 0 ? newNumber.toFixed(0) : newNumber.toFixed(maxLengthOfDecimal);
  }

  return (
    formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (newNumber >= 1e9 ? 'B' : newNumber >= 1e6 ? 'M' : '')
  );
};

export const getName = (user?: UserPublic) => {
  if (!user) return '';

  return user.first_name + ' ' + user.last_name;
};

export function secondsToHm(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}m`;
}

export const secondsToHms = (duration: number) => {
  const timeLeft = new Date(duration * 1000).toISOString().substr(11, 8);
  return timeLeft;
};

export function shorten(s: string | undefined, max = 12) {
  if (!s) return '';
  return s.length > max
    ? `${s.substring(0, max / 2 - 1)}…${s.substring(s.length - max / 2 + 2, s.length)}`
    : s;
}

export function isWithinCurrentDay(lastSyncTimeIso: string | undefined) {
  if (!lastSyncTimeIso) return false;

  const currentDate = new Date();

  return lastSyncTimeIso.substring(0, 10) === currentDate.toISOString().substring(0, 10);
}

export const toTitleCase = (str: string): string => {
  const arrayTitles = str.split('_');

  return arrayTitles.join(' ');
};

export function getArraysRandomObjectId(min: number, max: number, total: number) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  // Shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap
  }

  // Return the first 'count' numbers from the shuffled array
  return numbers.slice(0, total);
}

export function shuffleArray(array: { object_id: number; img_url: string; speed: number }[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Chọn một chỉ số ngẫu nhiên từ 0 đến i
    const j = Math.floor(Math.random() * (i + 1));

    // Hoán đổi phần tử array[i] và array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
