const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token; // Ensure cookies exist before accessing

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_USER_SECRET);
    if (!decodedData) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = { id: decodedData.id }; // ✅ Set user object properly

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token verification failed", error: error.message });
  }
}

module.exports = { userMiddleware };
