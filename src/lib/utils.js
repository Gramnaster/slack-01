export const formatDateToLocal = (dateRequest) => {
  const request = dateRequest;
  let returnValue = '';

  const current = new Date();

  const dateFormat = `//TZ:${current.getUTCFullYear()}.${current.getUTCMonth()}.${current.getUTCDate()}-${current.getUTCHours()}${current.getUTCMinutes()}HRS-PHNCRBGC`;
  const yearFormat = `${current.getUTCFullYear()}`;
  request === 'yearFormat' ? returnValue = yearFormat : returnValue = dateFormat;
  return returnValue;
};