const jwt = require("jsonwebtoken");
const byPassedRoutes = ["/v1/users/register", "/v1/users/login"];

const verifyAccessToken = async (req, res, next) => {
  const originalUrl = req.originalUrl;

  // Check if the request URL starts with "/v1/"
  if (originalUrl.startsWith("/v1/")) {
    // Check if the requested URL is in the bypassed routes
    if (byPassedRoutes.includes(originalUrl)) {
      return next();
    }

    // Check if the authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(403)
        .json({ status: false, message: "Please login to access the data" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ status: false, message: "Invalid token" });
    }

    try {
      // Verify the token
      const JWT_SECRET = process.env.JWT_SECRET;
      const payload = await jwt.verify(token, JWT_SECRET);

      // If verification is successful, attach the user ID to the request object
      req.sub = payload.sub;
      next();
    } catch (error) {
      // Handle token verification errors
      return res
        .status(500)
        .json({ status: false, message: "Failed to authenticate token." });
    }
  } else {
    // If the request URL doesn't start with "/v1/", pass it to the next middleware
    next();
  }
};

module.exports = verifyAccessToken;
