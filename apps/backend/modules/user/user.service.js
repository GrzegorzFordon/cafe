/*owns business rules;
orchestrates repositories and gateways;
works with domain models, not HTTP details.*/

import {UserRepository} from "./user.repo.js";

const createUser = async (userData) => {
  return await UserRepository.create(userData);
};

const getUserById = async (userID) => {
  return await UserRepository.get(userID);
};

export const UserService = {
  createUser,
  getUserById,
};
