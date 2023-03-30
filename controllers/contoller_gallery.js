const storeItem = require("../store");
const getStorageItem = require("../usage");

const getFilesInDirectory = require("../config/fileList");

const get = async (req, res) => {
  getFilesInDirectory("./public/dist/user").then((data) => {
    const newData = data.map((img, i) => {
      img.altText = getStorageItem(img.fileName);
      return img;
    });
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
      }
    };

    shuffleArray(newData);
    res.render("pages/gallery", { images: newData });
  });
};

const post = async (req, res) => {
  if (!req.body.serie) {
    getFilesInDirectory("./public/dist/user").then((data) => {
      const imgName = `${req.body["img-name"]}-${data.length - 1}`.replaceAll(
        " ",
        ""
      );
      storeItem(imgName, req.body["img-alt"]);

      res.redirect("/gallery");
    });
  } else {
    getFilesInDirectory("./public/dist/user").then((data) => {
      const select = req.body["selected-image"];
      // Make sure usedData is always an array
      const usedData = typeof select == "string" ? [select] : select;
      const selection = data.filter((item) => {
        if (usedData) {
          return usedData
            .map((image) => item.fileName == image)
            .find((item) => item);
        }
        return true;
      });

      //   const possibleToAdd = data.map((item) => {
      //     return selection.find((select) => select !== item);
      //   });
      // .filter((item) => item);

      //   console.log(possibleToAdd);
      res.render("pages/gallery", {
        images: selection,
        // possibleToAdd: possibleToAdd.length !== 0 ? possibleToAdd : undefined,
      });
    });
  }
};

module.exports = { get, post };
