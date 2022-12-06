const express = require("express");
const {PORT} = require("./config");
const router = require("./todo");
const server = express();


server.listen(PORT, () => console.log(`server http://localhost:${PORT}`))

server.set("view engine", "ejs");
server.set("views", "./views");

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use("/todos", router)