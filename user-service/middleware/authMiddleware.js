const jwt = require("jsonwebtoken");

const getJwtSecret = () =>
  process.env.JWT_SECRET || "cinebook_dev_secret_change_me";

const getBearerToken = (authHeader) => {
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }

  const match = authHeader.trim().match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
};

const protect = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication required. Bearer token missing." });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You are not allowed to access this resource." });
    }

    next();
  };

module.exports = { protect, authorizeRoles };
