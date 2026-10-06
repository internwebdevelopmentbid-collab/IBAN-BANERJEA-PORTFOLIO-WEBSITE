import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

const loginAdmin = async (username, password) => {
  const admin = await Admin.findOne({
    username,
  });

  if (!admin) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, admin.password);

  if (!passwordMatches) {
    return null;
  }

  const token = generateToken(admin._id.toString());

  return {
    admin,
    token,
  };
};

export default loginAdmin;
