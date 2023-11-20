const validationResult = require("express-validator").validationResult;
const productsModel = require("../models/products.model");

exports.getAdd = (req, res, next) => {
  res.render("add-product", {
    validationErrors: req.flash("validationErrors"),
    isUser: true,
    isAdmin: true,
    pageTitle: "Add Product",
  });
};

exports.postAdd = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    req.body.image = req.file.filename;
    console.log(req.body);
    productsModel
      .addNewProduct({
        Name: req.body.productName,
        Category: req.body.productCategory,
        Description: req.body.productDescription,
        Image: req.body.image,
        Author: req.body.productAuthor,
        Price: req.body.productPrice,
      })
      .then(() => {
        req.flash("added", true);
        res.redirect("/admin/add");
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/admin/add");
  }
};

exports.getOrders = (req, res, next) => {
  res.render("manage-orders", {
    validationErrors: req.flash("validationErrors"),
    isUser: true,
    isAdmin: true,
    pageTitle: "Manage Orders",
  });
};

exports.getProducts = (req, res, next) => {
  productsModel.getAllProducts().then((items) => {
    res.render("manage-products", {
      items: items,
      isUser: true,
      validationError: req.flash("validationErrors")[0],
      isAdmin: true,
      pageTitle: "Manage Products",
    });
  });
};
exports.postDeleteProduct = (req, res, next) => {
  productsModel.deleteProduct(req.body.id).then(() => {
    res.redirect("/admin/products");
  })
  .catch((err) => {
    console.log(err)
    next(err)
  });
}
