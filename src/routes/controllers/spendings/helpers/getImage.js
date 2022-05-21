const { readFile } = require('fs').promises;
const { uploadPath } = require('./constants');


module.exports = async (invoicefile, userID) => {
  const imageFile = await readFile(uploadPath + '/' + userID + '/' + invoicefile);
  const base64Image = imageFile.toString('base64');
  const contentType = `image/${invoicefile.split('.').pop()}`;
  const invoiceImageString = `data:${contentType};base64,${base64Image}`;

  return [invoiceImageString, contentType];
}
