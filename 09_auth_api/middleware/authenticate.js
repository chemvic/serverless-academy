const jwt = require('jsonwebtoken');
const HttpError = require('../helpers/httpError');

const SECRET_KEY= 'RKOyK66aKfIAnoNWlniL7onDvZ9Fdoek';

const authenticate =async(req, res, next)=>{
    const {authorization =""}= req.headers;
    const [bearer, token]=authorization.split(" ");

    if(bearer!= "Bearer"){
       HttpError(401, "Invalid token")
    };
    if (!token) {
       HttpError(401, "Token not provided");
    };

    try {
        const payload = jwt.verify(token, SECRET_KEY);

        if (payload.type!='access') {
            next(HttpError(401, "Invalid token"));
        };
//============================SOME CODE=======================================


    } catch (error) {
    if(error instanceof jwt.TokenExpiredError){
        next(HttpError(401, "Expired token"));
    } else if (error instanceof jwt.JsonWebTokenError){
        next(HttpError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
      next();
  };

module.exports = authenticate;
