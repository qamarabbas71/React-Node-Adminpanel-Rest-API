import { db } from "../connection.js";

export const addProduct = (req, res) => {
  const { pr_name, pr_catogary, pr_stock, pr_price, pr_quantaty } = req.body;
  const { filename } = req.file;
    const q =
      "INSERT INTO products(`pr_name`,`pr_image`, `pr_catogary`, `pr_stock`, `pr_quantaty`, `pr_price`) VALUE (?)";
    const values = [
      pr_name,
      filename,
      pr_catogary,
      pr_stock,
      pr_quantaty,
      pr_price,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({ message: "Product added successfully" });
    });
};

export const getProduct = (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ data: result});
      });
};

export const getCustomerProduct = (req, res) => {  };

export const deleteProduct = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM products WHERE pr_id = ${id}`;

  db.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  });
};
