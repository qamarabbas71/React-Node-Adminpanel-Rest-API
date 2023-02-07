import { db } from "../connection.js";
import jwt from "jsonwebtoken";

export const addProducts = (req, res) => {
  const { pr_name, pr_disc, pr_status, pr_price_unit, pr_price } = req.body;
  const { filename } = req.file;
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    const q =
      "INSERT INTO orders(`p_name`, `p_disc`, `p_status`, `p_image`, `p_price_unit`, `p_price`,`userId`) VALUE (?)";
    const values = [
      pr_name,
      pr_disc,
      pr_status,
      filename,
      pr_price_unit,
      pr_price,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({ message: "Product added successfully" });
    });
  });
};

export const getProducts = (req, res) => {
  const query =
    "SELECT o.*, u.name FROM orders AS o JOIN users AS u ON o.userId=u.id ORDER BY o.p_id;";

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({ data: results });
  });
};
export const getCustomerProducts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }else{
        const query =
        "SELECT p.*, u.* FROM orders AS p JOIN users AS u ON (p.userId=u.id AND u.id = ?)";
      db.query(query,[userInfo.id], (error, results) => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.status(200).json({ data: results });
      });
    }
})


   
  };

export const deleteProducts = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM orders WHERE p_id = ${id}`;

  db.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  });
};
