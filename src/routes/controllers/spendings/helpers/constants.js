const path = require('path');

module.exports.uploadPath = process.env.PROD ?
    process.env.PFA_INVOICES_IMAGES_PATH
    :
    path.join(__dirname, '../../../../', 'invoicesUpload/');
