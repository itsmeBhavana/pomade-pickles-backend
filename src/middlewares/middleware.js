export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; // Attach the decoded payload to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
