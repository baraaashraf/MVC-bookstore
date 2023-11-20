const { rejects } = require("assert");
const mongoose = require("mongoose");
const db_url = "mongodb://localhost:27017/online-shop";

const productSchema = mongoose.Schema({
  Name: String,
  Category: String,
  Description: String,
  Image: String,
  Author: String,
  Price: Number,
});
const Product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Product.find({});
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Product.find({ Category: category });
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getProductsById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Product.findOne({ _id: id });
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getFirstProduct = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return Product.findOne();
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.addNewProduct = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        let newProduct = new Product(data);
        return newProduct.save();
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};


exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => Product.deleteOne({ _id: id }))
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

