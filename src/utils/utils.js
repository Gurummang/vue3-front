const getTodayDate = () => {
  let today = new Date();
  return today.toISOString().substring(0,10);
};

export { getTodayDate };