const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_SECRET || "cinebook_dev_secret_change_me";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required. Bearer token missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, getJwtSecret());
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "You are not allowed to access this resource." });
  }

  next();
};

module.exports = { protect, authorizeRoles };
