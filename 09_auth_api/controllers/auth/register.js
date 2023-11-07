const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../db');
const SECRET_KEY= "RKOyK66aKfIAnoNWlniL7onDvZ9Fdoek";
const REFRESH_SECRET_KEY="VqHehj52dHWc51VhiVVf";
const TIME_OF_LIFE_TOKEN ='60m';
const  HttpError  = require("../../helpers/httpError");



// require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length > 0) {
    throw HttpError(409, "Email already in use");
  };
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [ email, hashPassword]);

const payloadAccess={id : newUser.rows[0].id};

const accessToken =jwt.sign(payloadAccess,SECRET_KEY, { expiresIn: `${TIME_OF_LIFE_TOKEN}` });

const payloadRefresh={id : newUser.rows[0].id};

const refreshToken =jwt.sign(payloadRefresh, REFRESH_SECRET_KEY);




res.status(201).json({ success: true, data: { id: newUser.rows[0].id, accessToken, refreshToken } });
};

module.exports = register;
