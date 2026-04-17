import asyncHandler from "express-async-handler";
import { UserService } from "./user.service.js";

const getUser = asyncHandler(async (req, res) => {
  // const result = await User.findOne({ name }).lean().exec();
  try {
    const { id } = req.body;
    const user = await UserService.getUserById(id);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const createUser = asyncHandler(async (req, res) => {});
const updateUser = asyncHandler(async (req, res) => {});

export const userController = {
  getUser,
  createUser,
  updateUser,
  //   getAllUsers,
  //   deleteUser,
};

/*receives the request;
validates and normalizes input;
delegates to the service layer;
maps domain output back into response DTOs.*/
