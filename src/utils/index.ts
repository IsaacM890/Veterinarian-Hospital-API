/** @format */

const getRequireText = (fieldname: string) => {
  return `${fieldname} is required`;
};

const getValidText = (fieldname: string) => {
  return `Please include a valid ${fieldname}`;
};

const getLengthText = (fieldname: string, num: string) => {
  return `Please enter a ${fieldname} with ${num} or more characters`;
};

const getDateFormat = (date: string, time: string) =>
  new Date(date).toLocaleDateString() + new Date(time).toLocaleString();

export { getRequireText, getValidText, getLengthText, getDateFormat };
