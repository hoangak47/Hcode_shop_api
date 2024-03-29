const express = require("express");
var cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const parser = require("body-parser");
app.use(express.json());
app.use(parser.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

app.use("/products", require("./Routers/Product.router"));

app.use("/categories", require("./Routers/Category.router"));

app.use("/user", require("./Routers/User.router"));

app.use("/login", require("./Routers/Login.router"));

app.use("/register", require("./Routers/Register.router"));

app.use("/purchase", require("./Routers/Purchase.router"));

app.use("/cart", require("./Routers/Cart.router"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
