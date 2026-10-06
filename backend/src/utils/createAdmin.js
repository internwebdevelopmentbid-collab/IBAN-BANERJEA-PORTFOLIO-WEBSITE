import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import connectDB from "../config/database.js";

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error("Usage: node src/utils/createAdmin.js <username> <password>");

  process.exit(1);
}

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      username,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      username,
      password: hashedPassword,
    });

    console.log("Admin created successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
