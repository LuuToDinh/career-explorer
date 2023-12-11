import { getTime, formatDistanceToNow } from 'date-fns';
import dayjs, { format } from 'dayjs';

// ----------------------------------------------------------------------

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatDayJs(date, newFormat) {
  const fm = newFormat || 'DD/MM/YYYY';
  return dayjs(date).format(fm);
}

export function formatDayJsDateTime(date, newFormat) {
  const fm = newFormat || 'DD/MM/YYYY p';

  return date ? dayjs(date).format(fm) : '';
}
