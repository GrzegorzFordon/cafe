/*owns business rules;
orchestrates repositories and gateways;
works with domain models, not HTTP details.*/

import CustomError from "../../common/errors/customError.js";
import { UserRepository } from "./user.repo.js";

const createUser = async (userData) => {
  const user = await UserRepository.create(userData);
  return user;
};

const getUserById = async (userID) => {
  const user = await UserRepository.getByID(userID);
  if (!user) throw new CustomError("User not found", 401);
  return user;
};

const getUserByUsername = async (userName) => {
  const user = await UserRepository.getByUsername(userName);
  if (!user) throw new CustomError("User not found", 401);
  return user;
};

export const UserService = {
  createUser,
  getUserById,
  getUserByUsername,
};
