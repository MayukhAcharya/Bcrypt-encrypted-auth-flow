const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(userName) {
  const accessToken = jwt.sign({ userName }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  return accessToken;
}

function generateRefreshToken(userName) {
  const refreshToken = jwt.sign({ userName }, process.env.REFRESH_TOKEN_SECRET);
  return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
