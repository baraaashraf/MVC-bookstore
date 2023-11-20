const router = require("express").Router();
const check = require("express-validator").check;
const multer = require("multer");
const adminGuard = require("./guards/admin.guard");
const adminController = require("../controllers/admin.controller");
const bodyParser = require("body-parser");

router.get("/add", adminGuard, adminController.getAdd);

router.post(
  "/add",
  adminGuard,
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("productImage"),
  check("productImage").custom((value, { req }) => {
    if (req.file) return true;
    else throw "image is required";
  }),
  adminController.postAdd
);

router.get("/orders", adminGuard, adminController.getOrders);
module.exports = router;

router.get("/products", adminGuard, adminController.getProducts);

router.post(
  "/products/delete",
  adminGuard,
  bodyParser.urlencoded({ extended: true }),
  adminController.postDeleteProduct
);
module.exports = router;
