// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to request object
    req.user = decoded;
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid", success: false });
  }
};


// middlewares/roleMiddleware.js
export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is in the allowed roles list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied, insufficient permissions" });
    }
    next(); 
  };
};
