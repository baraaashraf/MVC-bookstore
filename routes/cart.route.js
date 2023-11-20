const router = require('express').Router()

const bodyParser = require("body-parser");
const authGuard = require("./guards/auth.guard");
const cartController = require("../controllers/cart.controller");


const check = require("express-validator").check;


router.get('/',authGuard.isAuth,cartController.getCart)

router.post(
  "/",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("Amount is required")
    .isInt({ min: 1 })
    .withMessage("Amount must be atleast 1"),
  cartController.postCart
);

router.post('/save',  authGuard.isAuth,
bodyParser.urlencoded({ extended: true }),
check("amount")
  .not()
  .isEmpty()
  .withMessage("Amount is required")
  .isInt({ min: 1 })
  .withMessage("Amount must be atleast 1"),
  cartController.postSave)



router.post('/delete', authGuard.isAuth,
bodyParser.urlencoded({ extended: true }),
cartController.postDelete)

router.post('/deleteall',authGuard.isAuth,
bodyParser.urlencoded({ extended: true }),
cartController.postDeleteAll)

router.post('/order',authGuard.isAuth,
bodyParser.urlencoded({ extended: true }),
cartController.postOrder)

router.get('/order',authGuard.isAuth,
cartController.getVerify)

module.exports = router