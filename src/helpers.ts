import moment from "moment";

export const getDateTimeString = (type: string, date: Date): string => {
  const d = moment(date).utc(false);

  if (type === 'start') {
    d.hours(0);
    d.minutes(0);
    d.seconds(0);
    d.milliseconds(0);
  }

  if (type === 'end' && !isDateToday(date)) {
    d.hours(23);
    d.minutes(59);
    d.seconds(59);
    d.milliseconds(999);
  }

  return d.toISOString();
}

const isDateToday = (date:Date):boolean => new Date().getTime() - date.getTime() < 8.64e+7;

export const dateTimeString = (date: Date): string => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear();

  return `${hours}:${minutes}:${seconds}  ${day}.${month}.${year}`
}

