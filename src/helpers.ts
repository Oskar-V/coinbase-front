import moment from "moment";

export const getDateTimeString = (type:string, date:Date) : string => {
  const d = moment(date).utc(false);

  if (type === 'start'){
    d.hours(0);
    d.minutes(0);
    d.seconds(0);
    d.milliseconds(0);
  }

  if (type === 'end' && !isDateToday(date)){
    d.hours(23);
    d.minutes(59);
    d.seconds(59);
    d.milliseconds(999);
  }

  return d.toISOString();
}

const isDateToday = (date:Date):boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
}

