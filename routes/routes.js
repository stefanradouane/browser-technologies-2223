/*******************************************************
 * Define some constants and variables
 ********************************************************/
const express = require("express");
const controllers = require("../controllers/controllers");
const router = express.Router();

const { upload } = require("../config/multer");

/*******************************************************
 * Create GET router
 ********************************************************/
router.get("/", controllers.index.get);
router.get("/gallery", controllers.gallery.get);
router.get("/gallery/:image", controllers.detailpage.get);
router.get("/course", controllers.course.get);
router.get("/new-image", controllers.image.get);

/*******************************************************
 * Create POST router
 ********************************************************/
router.post("/gallery", upload.single("img"), controllers.gallery.post);

/*******************************************************
 * Export router
 ********************************************************/
module.exports = router;
