const productsModel = require("../models/products.model");
console.log('productsModel:' + productsModel)

exports.getHome = (req, res, next) => {
  let category = req.query.category;
  let validCategories= ['Programming','Psychology']
  let productPromise;
  if (category && validCategories.includes(category)) {
    productPromise = productsModel
      .getProductsByCategory(category)
  } else {
    productPromise = productsModel.getAllProducts()
  }
  productPromise.then((products) => {
    res.render("index", {
      products: products,
      isUser: req.session.userId,
      isAdmin:req.session.isAdmin,
      validationError:req.flash('validationErrors')[0],
      pageTitle: 'Home'
    });
  });
};
