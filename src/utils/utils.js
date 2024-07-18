const getTodayDate = () => {
  let today = new Date();
  return today.toISOString().substring(0,10);
};

const getSaasImg = (name) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '');
  return `./src/assets/${formattedName}.png`;
};

export { getTodayDate, getSaasImg };