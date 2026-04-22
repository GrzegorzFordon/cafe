import "dotenv/config";
import jwt from "jsonwebtoken";

import { UserService } from "../user/user.service.js";
import CustomError from "../../common/errors/customError.js";

const login = async (username, password) => {
  if (!username || !password) throw new CustomError("All fields required", 400);
  const foundUser = await UserService.getUserByUsername(username);
  if (!foundUser) throw CustomError("User not found", 401);
  const isMatch = await foundUser.isValidPassword(password);
  if (!isMatch) throw new CustomError("Invalid", 403);

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

  return { accessToken, refreshToken };
};

const register = async (username, password) => {
  if (!username || !password) throw new CustomError("All fields required", 400);
  try {
    const duplicate = await UserService.getUserByUsername(username);
    if (duplicate)
      return res.status(409).json({ message: "name already in use." });
  } catch (error) {}

  const userObject = { name: username, email: username, password: password };
  console.log(userObject);
  const user = await UserService.createUser(userObject);
  return { user };
};

export const AuthService = {
  login,
  register,
};
