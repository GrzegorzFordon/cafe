import User from "./user.model.js";

const create = async (userData) => {
  try {
    const user = new User(userData);
    return await user.create(userdata);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getByID = async (userID) => {
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

const getByUsername = async (userName) => {
  try {
    const user = User.findOne({name:userName});
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
  getByID,
  getByUsername,
};
