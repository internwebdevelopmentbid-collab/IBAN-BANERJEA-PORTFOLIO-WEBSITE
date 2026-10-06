import jwt from "jsonwebtoken";

import env from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, env.jwtSecret);

    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication",
    });
  }
};

export default authMiddleware;
