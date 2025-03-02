require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const { authenticate } = require("./utils/authenticate");
const login = require("./v1/post/login");
const refresh = require("./v1/post/refresh");
const positions = require("./v1/get/positions");
const signup = require("./v1/post/signup");

app.use(express.json());

app.post("/v1/post/login", login.loginHandler);

app.post("/v1/post/refresh", refresh.refreshHandler);

app.post("/v1/post/signup", signup.signupHandler);

app.get("/v1/get/positions", authenticate, positions.positionsHandler);

app.listen(3000);
