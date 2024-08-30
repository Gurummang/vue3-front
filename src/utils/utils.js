export const getTodayDate = () => {
  let today = new Date();
  return today.toISOString().substring(0,10);
};

export const getDate = (date) => {
  return date.substring(0,10);
}

export const getfileSize = (byte) => {
  let s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let e = Math.floor(Math.log(byte) / Math.log(1024));
  return (byte / Math.pow(1024, e)).toFixed(2) + " " + s[e];
}

export const getSaasImg = (name) => {
  const imgName = name.toLowerCase().replace(/\s+/g, '');
  // return `../../public/assets/${imgName}.png`;
  return `../../assets/${imgName}.png`;
};

export const removeZeroDivision = (num) => {
  return num <= 0 ? 0.001 : num;
}

export const convertDate = (date) => {
  return new Date(date).toLocaleString();
}

export const removeWordDate = (date) => {
  // console.log('오류 찾자',date);
  if(date == null) return date;
  return date.replace('T', ' ');
}

export const convertSaasName = (saas) => {
  const saasName = ( saas === 'o365'? 'microsoft365': saas);
  return saasName;
}

export const formatFileTypes = (types) => {
  if (types.length <= 2) {
    return types;
  }
  return [...types.slice(0, 2), `...외의 ${types.length - 2}개`];
}

// export { getTodayDate, getSaasImg, getDate };