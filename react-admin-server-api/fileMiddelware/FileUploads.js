import multer from "multer";
export const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./upload");
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    }),
  }).single("file");

  export const orderupload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./upload/products");
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    }),
  }).single("pr_image");


  export const productupload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./upload/productpicture");
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    }),
  }).single("pr_image");