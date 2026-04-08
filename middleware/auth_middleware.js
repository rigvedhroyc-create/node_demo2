const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }

  // ✅ Extract token after "Bearer "
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();

  } catch (error) {

    console.log("JWT ERROR:", error); // 🔥 debug
    res.status(401).json({ message: "Invalid token" });

  }

};