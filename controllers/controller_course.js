const getFilesInDirectory = require("../config/fileList");

const get = (req, res) => {
  res.render("pages/course");
  // getFilesInDirectory("./public/dist/user").then((data) => {
  //   res.status(200).json(data);
  // });
};

module.exports = { get };
