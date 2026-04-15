import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const getUser = asyncHandler(async (req, res) => {});

export const usersController = {
  getUser,
  //   getAllUsers,
  //   createUser,
  //   updateUser,
  //   deleteUser,
};
