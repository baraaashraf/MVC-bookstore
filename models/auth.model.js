const mongoose = require("mongoose");
const db_url = "mongodb://localhost:27017/online-shop";
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  Username: String,
  Email: String,
  Password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return User.findOne({ Email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("Email is already used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          Username: username,
          Email: email,
          Password: hashedPassword,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("user Created");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => User.findOne({ Email: email }))
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("Email does not exist");
        } else {
          bcrypt.compare(password, user.Password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("Incorrect Password");
            } else {
              mongoose.disconnect();
              resolve({
                id: user._id,
                isAdmin: user.isAdmin,
              });
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

