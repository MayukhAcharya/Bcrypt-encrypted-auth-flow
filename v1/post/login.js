const bcrypt = require("bcrypt");

const { data } = require("../../DB/userData");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateToken");

const loginHandler = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const findUser = data.find((item) => item.userName === userName);
    if (findUser) {
      const passwordFromDb = findUser.password;

      const verifyPassword = await bcrypt.compare(password, passwordFromDb);

      if (verifyPassword) {
        const accessToken = generateAccessToken(userName);
        const refreshToken = generateRefreshToken(userName);

        return res.status(200).send({
          message: "User logged in successfully",
          status: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }

      return res.status(400).send({
        message: "Wrong Password, please check your password and try again",
        status: false,
      });
    }
    return res.status(400).send({
      message: `No user found with the userName ${userName}`,
      status: false,
    });
  } catch (error) {
    return res.status(500).send({
      status: "false",
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = { loginHandler };
