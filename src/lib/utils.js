import { fetchGenCode } from "./data";

export const formatDateToLocal = (dateRequest) => {
  const request = dateRequest;
  let returnValue = '';
  // const locale = 'en-US';
  // const options = {
  //   day: 'numeric',
  //   month: 'numeric',
  //   year: 'numeric',
  // };

  const current = new Date();
  // console.log(`Variable 'current' is:, ${current}`);
  // const formatter = new Intl.DateTimeFormat(locale, options);
  // console.log(`Variable 'formatter' is: ${formatter}`);

  // Tomorrow, fix the date so it's local rather than UTC and it has proper zeroes
  const dateFormat = `//TZ:${current.getUTCFullYear()}.${current.getUTCMonth()}.${current.getUTCDate()}-${current.getUTCHours()}${current.getUTCMinutes()}HRS-PHNCRBGC`;
  const yearFormat = `${current.getUTCFullYear()}`;
  // console.log(`Variable 'dateFormat' is: ${dateFormat}`);
  request === 'yearFormat' ? returnValue = yearFormat : returnValue = dateFormat;
  return returnValue;
};

// Generates the unique triple number for the main menu
// export const randomTriNumberGen = () => {
//   try {
//     const triValue = fetchGenCode();

//     if (!triValue) {
//       return 'ERROR-TRI-VALUE-NOT-FOUND';
//     };
//     console.log('triNumber value:', triValue);

//     const triString = String(triValue);
//     const triFormat = triString.replace(/.{3}/g, '$& ').trim();
//     console.log('triFormat value:', triFormat);

//     return triFormat;
//   } catch (error) {
//     console.error(`randomTriNumberGen error:`, error);
//     return 'ERROR-CODE-GENERATION-FAILED';
//   }
// };

export const displayUserAccess = async () => {
  const x = 0;
  return x;
}