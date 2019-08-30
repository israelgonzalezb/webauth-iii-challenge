const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {

    const tokenHeader = req.headers.authorization;
    
  
    if (tokenHeader) {
      const tokenStrings = tokenHeader.split(" ");
            if (tokenStrings[0].toUpperCase() === 'BEARER' && tokenStrings[1]) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
            // bad token!
            res.status(401).json({message: 'error verifying token', error: err});
          } else { 
          req.decodedJwt = decodedToken;
            next();
          }
        });
      } else {
        res.status(401).json({message:"invalid scheme, or no token after scheme name."})
      }
    } else {
      res.status(401).json({message: 'missing Authorization header'});
    }
  
  };