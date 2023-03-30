const multer = require("multer");
const path = require("path");

const getFilesInDirectory = require("../config/fileList");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/dist/user`);
  },
  filename(req, file, cb) {
    const userFileName = req.body["img-name"].replaceAll(" ", "");
    const fileEnd = path.extname(file.originalname);
    getFilesInDirectory("./public/dist/user").then((data) => {
      const datacount = data.length;
      const fileName = userFileName + "-" + datacount + fileEnd;
      cb(null, fileName);
    });
  },
});

const upload = multer({
  storage: fileStorageEngine,
});

module.exports = {
  upload,
};
