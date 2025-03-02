const bcrypt = require("bcrypt");

const { data } = require("../../DB/userData");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateToken");

const signupHandler = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName && !password) {
      return res.status(400).send({
        message: "Please add userName and Password",
      });
    }

    const findDuplicateUserName =
      data.length > 0 && data.find((item) => item.userName === userName);

    if (findDuplicateUserName) {
      return res.status(400).send({
        status: false,
        message: "userName already exists, please use different userName",
      });
    }

    const hashPassword = await bcrypt.hash(password, 11);

    const accessToken = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);

    data.push({
      userName: userName,
      password: hashPassword,
    });

    return res.status(200).send({
      message: "User created successfully",
      accessToken,
      refreshToken,
      status: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      status: false,
      error: error.message,
    });
  }
};

module.exports = { signupHandler };
