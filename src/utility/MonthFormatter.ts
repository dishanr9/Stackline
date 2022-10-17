import { DateTime } from "luxon";

export const formatJSDate = (tick: string) => {
  // Due to time lag, ticks can often be 0/"auto"
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!tick.toString().match(regEx)) return;
  
  let date = DateTime.fromFormat(tick, "yyyy-MM-dd");
  if (date?.get("day") <= 7) {
    return date.monthShort.toUpperCase();
  }
  return "";
};
