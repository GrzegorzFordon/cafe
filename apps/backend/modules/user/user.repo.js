import User from "./user.model.js";

const create = async (userData) => {
  try {
    const user = new User(userData);
    return await user.create(userdata);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const get = async (userID) => {
  try {
    const user = User.findById(userID);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const UserRepository = {
  create,
  get,
};
