const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshHandler = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const newAccessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      return res.status(200).send({
        accessToken: newAccessToken,
        status: true,
      });
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { refreshHandler };
