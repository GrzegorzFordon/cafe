import asyncHandler from "express-async-handler";
import { UserService } from "./user.service.js";

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await UserService.getUserById(id);
  res.status(200).json({ data: user });
});

// const createUser = asyncHandler(async (req, res) => {});
const updateUser = asyncHandler(async (req, res) => {});

export const userController = {
  getUser,
  updateUser,
  // createUser,
  //   getAllUsers,
  //   deleteUser,
};

/*receives the request;
validates and normalizes input;
delegates to the service layer;
maps domain output back into response DTOs.*/
