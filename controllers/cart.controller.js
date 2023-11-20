const cartModel = require("../models/cart.model");
const validationResult = require("express-validator").validationResult;

exports.postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .findItemInCart(req.session.userId, req.body.productId)
      .then((exisitingItem) => {
        if (exisitingItem) {
          const updatedAmount = +exisitingItem.Amount + +req.body.amount

          cartModel
          .updateExistingItem(req.body.productId, {
            Amount: updatedAmount,
            Timestamp: Date.now(),
          })
            .then(() => {
              res.redirect("/cart");
            })
            .catch((err) => {
              console.log(err)
              next(err)
            }).catch(err=>{
              console.log(err)
              next(err)
            })
        } else {
          cartModel
            .addNewItem({
              Name: req.body.name,
              Price: req.body.price,
              Image: req.body.image,
              Amount: req.body.amount,
              ProductId: req.body.productId,
              UserId: req.session.userId,
              Timestamp: Date.now(),
            })
            .then(() => {
              res.redirect("/cart");
            })
            .catch((err) => {
              console.log(err)
              next(err)
            });
        }
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};

exports.getCart = (req, res, next) => {
  cartModel
    .getItemsByUser(req.session.userId)
    .then((items) => {

      res.render("cart", {
        items: items,
        isUser: true,
        validationError: req.flash("validationErrors")[0],
        isAdmin: req.session.isAdmin,
        pageTitle: 'Cart'
      });
    })
    .catch((err) => {
      console.log(err)
      next(err)
    });
};

exports.postSave = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .editItem(req.body.cartId, {
        Amount: req.body.amount,
        Timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err)
        next(err)
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/cart");
  }
};

exports.postDelete = (req, res, next) => {
  cartModel
    .deleteItem(req.body.cartId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err)
      next(err)
    });
};


exports.postDeleteAll = (req, res, next) => {
  cartModel
    .deleteAllItems()
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err)
      next(err)
    });
};

exports.postOrder = (req, res, next) => {
  res.redirect("/cart/order")
}

exports.getVerify = (req, res, next) => {
  res.render('verify',{
    isUser: true,
    isAdmin: req.session.isAdmin,
    pageTitle: 'Verify Order'
  })
}
