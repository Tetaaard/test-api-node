const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Cookie").replace("token=", "");
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
