const express = require("express");
const path = require("path");


const homeRouter = require('./routes/home.route')
const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", "views");

app.get('/',homeRouter);


app.listen(3000, () => {
  console.log("server listen on port 3000");
});
