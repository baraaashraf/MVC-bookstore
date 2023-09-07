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
        resolve(products)
      }).catch(err=>reject(err))
  });
};
