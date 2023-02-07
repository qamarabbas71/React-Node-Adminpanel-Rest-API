import { db } from "../connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const {filename} = req.file;

    // Validate Name
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    // Validate Email
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return res.status(400).json({ message: "Pleas enter valid email." });
    }

    // Validate Password
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

   

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } 
      if (data.length) {
        return res.status(409).json({ message: "User already registered." });
      }

      // Hash Password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      const query = "INSERT INTO users (`name`,`email`,`phone`,`address`,`password`,`file`) VALUE (?)";
      const values = [name, email, phone, address, hashedPassword, filename];
      db.query(query, [values], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        return res.status(200).json({ message: "User registered successfully." });
      });
    });
  };


export const login = (req, res) => {
    const { email, password } = req.body;

     // Validate Email
     if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return res.status(400).json({ message: "Pleas enter valid email." });
      }
  
      // Validate Password
      if (!password) {
        return res.status(400).json({ message: "Password is required." });
      }

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!checkPassword) {
        return res.status(400).json({ message: "Wrong Email or Password " });
      }
      
      const token = jwt.sign({ id: data[0].id }, "secretkey");
      const { password, ...other } = data[0];
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  };

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: "none"
    }).status(200).json({ message: "User has been logged out" });
};
