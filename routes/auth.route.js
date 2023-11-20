const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const authGuard = require("./guards/auth.guard");
const authController = require("../controllers/auth.controller");

router.get("/signup", authGuard.notAuth, authController.getSignup);

router.post(
  "/signup",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password needs to be atleast 6 characters"),
  check("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw "passwords don't match";
  }),
  authController.postSignup
);

router.get("/login", authGuard.notAuth, authController.getLogin);

router.post(
  "/login",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password needs to be atleast 6 characters"),
  authController.postLogin
);

router.all("/logout", authGuard.isAuth, authController.logout);

module.exports = router;
