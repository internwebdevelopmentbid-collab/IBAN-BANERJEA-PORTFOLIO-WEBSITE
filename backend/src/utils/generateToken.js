import jwt from "jsonwebtoken";

import env from "../config/env.js";

const generateToken = (adminId) => {
  return jwt.sign(
    {
      adminId,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  );
};

export default generateToken;
