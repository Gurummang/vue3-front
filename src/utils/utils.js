const getTodayDate = () => {
  let today = new Date();
  return today.toISOString().substring(0,10);
};

const getSaasImg = (name) => {
  const imgName = name.toLowerCase().replace(/\s+/g, '');
  // return `../../public/assets/${imgName}.png`;
  return `../../assets/${imgName}.png`;
};

export { getTodayDate, getSaasImg };