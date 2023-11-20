const mongoose = require("mongoose");
const { resolve } = require("path");

const db_url = "mongodb://localhost:27017/online-shop";

const cartSchema = mongoose.Schema({
  Name: String,
  Image: String,
  Price: Number,
  Amount: Number,
  UserId: String,
  ProductId: String,
  Timestamp: Number,
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        let item = new CartItem(data);
        return item.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.updateExistingItem = (productId, newAmount) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() =>
        CartItem.updateOne({ ProductId: productId }, newAmount)
      )
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getItemsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() =>
        CartItem.find({ UserId: userId }, {}, { sort: { Timestamp: 1 } })
      )
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.findItemInCart = (userId, productId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => CartItem.findOne({ UserId: userId, ProductId: productId }))
      .then((item) => {
        mongoose.disconnect();
        console.log("grabbed item: " + item);
        resolve(item);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};


exports.editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => CartItem.updateOne({ _id: id }, newData))
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => CartItem.deleteOne({ _id: id }))
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteAllItems = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => CartItem.deleteMany({}))
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
