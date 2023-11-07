const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  HttpError  = require("../../helpers/httpError");
const db = require('../../db');
const SECRET_KEY= "RKOyK66aKfIAnoNWlniL7onDvZ9Fdoek";
const REFRESH_SECRET_KEY="VqHehj52dHWc51VhiVVf";
const TIME_OF_LIFE_TOKEN ='60m';


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0) {
    throw HttpError(404, "Email or password invalid or not exist");
  }
  const passwordCompare = await bcrypt.compare(password, user.rows[0].password);

  if (!passwordCompare) {
    throw HttpError(401, "Password is invalid");
  }

  const payloadAccess={id : user.rows[0].id};

  const accessToken =jwt.sign(payloadAccess, SECRET_KEY, { expiresIn: `${TIME_OF_LIFE_TOKEN}` } );
  
  const payloadRefresh={id : user.rows[0].id};
  
  const refreshToken =jwt.sign(payloadRefresh, REFRESH_SECRET_KEY);

  res.status(200).json({success:true, 
    data:{id: user.rows[0].uuid,
       accessToken,
       refreshToken, 
    }
  });
};

module.exports = login;
