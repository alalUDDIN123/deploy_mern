const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers?.token
  // console.log(token,"token");

  if (token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode,"decod")
    if (decode) {
      const userID = decode.userId;
      req.body.userID = userID;
      next();
    }
    else {
      res.send("Please Login First");
    }
  }
  else {
    res.send("Please Login First");
  }
};

module.exports = { authenticateUser };
