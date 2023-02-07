import express from "express";
const app = express();
import userRouter from "./routes/auth.js";
import getUserRouter from "./routes/user.js";
import getOrderRouter from "./routes/order.js";
import getProductRouter from "./routes/product.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {upload, productupload,orderupload} from "./fileMiddelware/FileUploads.js"
import multer from "multer";

// middelewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/upload', express.static('./upload'))
app.use('/product', express.static('./upload/products'))
app.use('/products', express.static('./upload/productpicture'))

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./upload");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//     },
//   }),
// }).single("file");

// const productupload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./upload/products");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//     },
//   }),
// }).single("pr_image");

app.use("/api/auth", upload, userRouter);
app.use("/api/user", getUserRouter);
app.use("/api/products", productupload,getProductRouter);
app.use("/api/product",orderupload, getOrderRouter);

app.listen(3001, () => {
  console.log("Server running on 3001 port");
});
