import asyncHandler from "express-async-handler";
import { AuthService } from "./auth.service.js";

const register = asyncHandler(async (req, res) => {
  try {
    const { name, pwd } = req.body;
    if (!name || !pwd) {
      return res.status(400).json({ message: "All fields required" });
    }

    const duplicate = await UserService.getByUsername(name);
    if (duplicate) {
      return res.status(409).json({ message: "name already in use." });
    }

    const userObject = { name: name, email: name, password: pwd };
    const user = await User.create(userObject);
    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

const login = asyncHandler(async (req, res) => {
  const { name, pwd } = req.body;
  const { accessToken, refreshToken } = await AuthService.login(name, pwd);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ message: "Login successful", accessToken });
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({ username: decoded.name });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const payload = { username: foundUser.name };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const accessToken = jwt.sign(payload, secret, {
        expiresIn: "30s",
      });

      res.json({ accessToken });
    },
  );
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: "true" });
  res.json({ message: "Cookie cleared" });
});

export const authController = {
  register,
  login,
  refresh,
  logout,
};
