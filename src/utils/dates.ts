/** Helper Util: Check if the given year is a leap year */
const isLeapYear = (year: number): boolean =>
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

/** Helper Util: Check if today is the day before 29th February */
export const isDayBeforeLeapDay = (): boolean => {
  const today = new Date();
  const year = today.getFullYear();

  if (!isLeapYear(year)) return false;

  const month = today.getMonth() + 1;
  const day = today.getDate();

  return month === 2 && day === 28;
};
