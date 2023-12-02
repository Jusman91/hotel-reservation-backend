import { createError } from "../middleware/error.js";
import User from "../models/User.js"

export const updateUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedUser) return next(createError(404, "User not found"))

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return next(createError(404, "User not found"))

    res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    next(error)
  }
};

export const getOneUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id);
    if (!user) return next(createError(404, "User not found"))

    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error)
  }
};