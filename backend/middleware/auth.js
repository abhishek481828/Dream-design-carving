const jwt = require("jsonwebtoken");

// Protect routes
exports.protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      console.log("Protect Middleware: User verified", req.user);
      next();
    } catch (error) {
      console.error("Protect Middleware Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.error("Protect Middleware: No token found");
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin only middleware
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("Admin Middleware: Access granted for", req.user.id);
    next();
  } else {
    console.error("Admin Middleware: Access denied. User role:", req.user?.role);
    res.status(401).json({ message: "Not authorized, admin only" });
  }
};

