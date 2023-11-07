const bcrypt = require("bcrypt");
const db = require('../../db');
const  HttpError  = require("../../helpers/httpError");
// require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length > 0) {
    throw HttpError(409, "Email already in use");
  };
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [ email, hashPassword]);

  res.status(201).json(user.rows);
};

module.exports = register;
