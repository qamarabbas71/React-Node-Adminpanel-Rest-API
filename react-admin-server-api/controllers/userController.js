import { db } from "../connection.js";

export const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({ data: results });
  });
};

export const getSingleUser = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";

  db.query(query, [id], (error, data) => {
    if (error) {
      return res.status(500).json({ error });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(data);
  });
};
