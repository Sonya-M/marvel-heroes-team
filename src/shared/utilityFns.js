import { LIMIT } from "./constants";
/**
 * 
 * @param {string} str string to shorten
 * @param {number} newLength max number of characters of the returned string
 * @returns {string} if string.length is less than max, returns it unchanged,
 * otherwise truncates the string to newLength and appends to it "..."
 */
export function shortenString(str, newLength) {
  if (str.length <= newLength) return str;
  // console.log(str.substring(0, newLength))
  return str.substring(0, newLength) + "...";
}


/**
 * @param {string} dateString string in a valid date format
 * @returns date string in the format DD Mon YYYY (e.g. "25 Mar 1972")
 */
export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' })
    .format(Date.parse(dateString));
}

export const getTotalPages = (totalResults) => {
  return Math.ceil(totalResults / LIMIT);
}