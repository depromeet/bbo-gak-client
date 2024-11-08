import { differenceInDays } from 'date-fns/differenceInDays';

interface Option {
  separator?: string;
}

export const formatToYYMMDD = (dateString: string, { separator = '' }: Option = {}) => {
  const date = new Date(dateString);

  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return [yy, mm, dd].join(separator);
};

export const dday = (target: Date | string) => {
  const targetDate = typeof target === 'string' ? new Date(target) : target;
  const today = new Date();

  return differenceInDays(targetDate, today);
};
