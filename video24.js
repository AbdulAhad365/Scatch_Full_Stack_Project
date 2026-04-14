const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookie_parser = require("cookie-parser");
const mongodbConnection = require("./config/mongooseConnection");
const expressSession = require("express-session");
const flash = require("connect-flash");
const dns=require("dns")
dns.setServers(["1.1.1.1", "8.8.8.8"]);


// now calling these files
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productRouter");
const usersRouter = require("./routes/userRouter");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
mongodbConnection();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie_parser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
  }),
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);


app.listen(3000, () => {
  console.log("listning at port 3000");
});
