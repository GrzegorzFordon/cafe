import "dotenv/config";
// import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, pwd } = req.body;

  try {
    if (!name || !pwd) {
      return res.status(400).json({ message: "All fields required" });
    }

    const duplicate = await User.findOne({ name }).lean().exec(); //TODO change to user controller
    // const duplicate = await userController.getUser
    if (duplicate) {
      return res.status(409).json({ message: "name already in use." });
    }

    const userObject = { name: name, email: name, password: pwd };
    const user = await User.create(userObject);
    // const user = await usersController.createUser(userobject);

    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, pwd } = req.body;
  console.log(name, pwd);
  try {
    if (!name || !pwd) {
      return res.status(400).json({ message: "All fields required" });
    }

    const foundUser = await User.findOne({ name });
    if (!foundUser) {
      return res.status(401).json({ message: "user not found" });
    }
    const isMatch = await foundUser.isValidPassword(pwd);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid" });
    }
    console.log(foundUser);
    const payload = { username: foundUser.name, id: foundUser._id };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "30s",
    });

    const refreshToken = jwt.sign(
      { username: foundUser.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

const refreshUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({ username: decoded.name });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const payload = { username: foundUser.name };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const accessToken = jwt.sign(payload, secret, {
        expiresIn: "30s",
      });

      res.json({ accessToken });
    }),
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: "true" });
  res.json({ message: "Cookie cleared" });
});

export const authController = {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
};
