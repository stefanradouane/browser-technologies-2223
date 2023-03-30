const getFilesInDirectory = require("../config/fileList");
const shuffleArray = require("../config/shuffleArray");
const getStorageItem = require("../usage");

const get = (req, res) => {
  console.log(req.params);

  getFilesInDirectory("./public/dist/user").then((data) => {
    let newData = data.map((img, i) => {
      img.altText = getStorageItem(img.fileName);
      return img;
    });

    newData = shuffleArray(newData);

    const image = newData.find((item) => {
      const boolean =
        item.fileName.split("-")[0].toLowerCase() ==
        req.params.image.toLowerCase();
      return boolean;
    });

    const recomentationList = newData
      .filter((item) => item !== image)
      .slice(0, 3);
    console.log(image);
    // res.render("pages/gallery", { images: newData });
    res.render("pages/detailpage", {
      image: image,
      recommended: recomentationList,
    });
  });
};

module.exports = { get };
