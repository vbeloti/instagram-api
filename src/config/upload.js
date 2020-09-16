const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(20).toString('hex');
    cb(null, `${hash}${path.extname(file.originalname)}`);
  },
});

module.exports = { storage };
