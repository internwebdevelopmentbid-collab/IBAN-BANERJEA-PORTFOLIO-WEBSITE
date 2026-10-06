import env from "../config/env.js";
import loginAdmin from "../services/authService.js";

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const result = await loginAdmin(username, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.cookie("admin_token", result.token, {
      httpOnly: true,
      secure: env.cookie.secure,
      sameSite: env.cookie.sameSite,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: result.admin._id,
        username: result.admin.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: env.cookie.secure,
    sameSite: env.cookie.sameSite,
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const getCurrentAdmin = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      admin: {
        id: req.adminId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { login, logout, getCurrentAdmin };
