const dbConnection = require('../../../db/dbinitmysql');
const sharp = require('sharp-m1');
const { access, unlink } = require('fs').promises;
const { constants } = require('fs');
const getImage = require('./helpers/getImage');


module.exports = async (req, res, _next) => {
  const {
    path: filepath,
    filename,
  } = req.file;

  sharp.cache(false);

  // check if the file has been written on disk by multer middleware just before
  await access(filepath, constants.F_OK);

  // get image size
  const imageMetadata = await sharp(filepath).metadata();
  const biggerSide = imageMetadata.width > imageMetadata.height ? 'width' : 'height';
  const biggerSideSize = biggerSide === 'width' ? 1125 : 1500;

  // resize file
  const splittedFilename = (filepath).split('.');
  const resizedPathAndFilename = splittedFilename.shift() + '-r.';
  const fileExtension = splittedFilename.pop();
  const outputPath = resizedPathAndFilename + fileExtension;

  await sharp(filepath)
    .resize({
      fit: sharp.fit.contain,
      [biggerSide]: biggerSideSize,
    })
    .toFile(outputPath);

  // delete original file
  await unlink(filepath);

  // save filename to db
  const resizedFilename = filename.slice(0, filename.search(/\./)) + '-r.' + fileExtension;
  if (req.body.itemType === 'spending') {
    const sqlSpending = `
      UPDATE Spendings
      SET invoicefile="${resizedFilename}"
      WHERE ID="${req.body.spendingID}"
    `;
    dbConnection.query(
      sqlSpending,
      async () => {
        const [invoiceImageString, contentType] = await getImage(resizedFilename, req.body.userID);
        res.setHeader('content-type', contentType);
        res.send(invoiceImageString);
      }
    );
  }
  // if (req.body.itemType === 'recurring') {
    // await prisma.recurrings.updateMany({
    //   where: { label: req.body.label},
    //   data: {
    //     invoicefile: resizedFilename,
    //   },
    // })
  // }
}

