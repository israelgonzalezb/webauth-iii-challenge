const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy(username)
      .first()
      .then(user => {
          
        if (user && bcrypt.compareSync(password, user.password)) {
            
            const token = genToken(user);
            console.log(token);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token
          });
  
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  

function genToken(user) {
    const payload = {
      subject: "user",
      username: user.username
    };
  
    const secret = secrets.jwtSecret;

    const options = {
      expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
  
  }
  

module.exports = router;