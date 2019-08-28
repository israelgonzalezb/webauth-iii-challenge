const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authRouter = require("..auth/auth-router.js");
// const usersRouter = require("../users/users-router.js");

const server = express();

const middlewares = [helmet(), express.json(), cors()]

server.use(middlewares);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res)=>{
    res.send("The server is running");
})

mmodule.exports = server;