const productsModel = require("../models/products.model");

exports.getProductById = (req, res, next) => {
  let id = req.params.id;
  productsModel.getProductsById(id).then((product) => {
    res.render("product", {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      pageTitle: "Product"
    });
  });
};

exports.getProduct = (req, res, next) => {
  productsModel.getFirstProduct().then((product) => {
    res.render("product", {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      pageTitle: "Product"
    });
  });
};
