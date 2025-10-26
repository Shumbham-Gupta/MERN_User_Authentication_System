
import jwt from "jsonwebtoken"
export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);

    // 🔹 Return 403 for invalid/expired tokens instead of generic 500
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
