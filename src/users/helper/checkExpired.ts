export const checkExpired = (date: Date) =>
  new Date(date) < new Date(Date.now()) ? true : false;
