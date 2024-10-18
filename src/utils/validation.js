export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
  return re.test(String(email).toLowerCase());
};

export const isDlpFile = (file) => {
  const prohibitedMimes = [
    'application/pdf',
    'application/msword', // doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    'application/vnd.ms-excel', // xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
    'text/csv', // csv
    'application/vnd.ms-powerpoint', // ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
    'text/plain', // txt
    'application/x-hwp', // hwp
  ];
  const prohibitedSignatures = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'csv',
    'ppt',
    'pptx',
    'txt',
    'hwp'
  ];
  const prohibitedExts = [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'csv',
    'ppt',
    'pptx',
    'txt',
    'hwp'
  ]
  // MIME 타입이나 확장자 중 하나라도 일치하면
  return prohibitedMimes.includes(file.mime) || prohibitedSignatures.includes(file.sign) || prohibitedExts.includes(file.ext);
}