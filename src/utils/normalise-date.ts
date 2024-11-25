/**
 * Helper Util: Normalise a date string whose format is `YYYY/MM/DD`
 *
 * This method returns a {@link Date} object
 */
export const normaliseDate = (date: string): Date => {
  const [birthYear, birthMonth, birthDay] = date.split('/');

  return new Date(
    parseInt(birthYear),
    parseInt(birthMonth) - 1,
    parseInt(birthDay),
    12,
  );
};
