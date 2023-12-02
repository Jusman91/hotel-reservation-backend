import { accessToken } from "../config/generateToken.js";
import { createError } from "../middleware/error.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: `User with ${email} already exists` })

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'user has been created' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (!existingUser) return next(createError(404, "User doesn't exists"))

    const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isPasswordValid) return next(createError(400, "Invalid password"))

    const token = accessToken({ id: existingUser._id, isAdmin: existingUser.isAdmin })

    const { password, isAdmin, ...user } = existingUser._doc

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
      .status(200).json({
        message: 'login succes fully',
        user,
      });
  } catch (error) {
    next(error);
  }
}