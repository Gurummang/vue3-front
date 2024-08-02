export const getTodayDate = () => {
  let today = new Date();
  return today.toISOString().substring(0,10);
};

export const getDate = (date) => {
  return date.substring(0,10);
}

export const getSaasImg = (name) => {
  const imgName = name.toLowerCase().replace(/\s+/g, '');
  // return `../../public/assets/${imgName}.png`;
  return `../../assets/${imgName}.png`;
};

export const removeZeroDivision = (num) => {
  return num <= 0 ? 0.001 : num;
}

// export { getTodayDate, getSaasImg, getDate };