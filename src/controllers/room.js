import Room from "../models/Room.js"
import { createError } from "../middleware/error.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const { hotelid } = req.params
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $push: { rooms: savedRoom._id }
      })
    } catch (error) {
      next(error)
    }

    res.status(201).json(savedRoom);
  } catch (error) {
    next(error)
  }
};

export const updateRoom = async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!updatedRoom) return next(createError(404, 'Room not found'));

    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error)
  }
};

export const deleteRoom = async (req, res, next) => {
  const { id } = req.params
  const { hotelid } = req.params
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) return next(createError(404, 'Room not found'));

    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: id }
      })
    } catch (error) {
      next()
    }

    res.status(200).json({ message: 'Room has been deleted' });
  } catch (error) {
    next(error)
  }
};

export const getOneRoom = async (req, res, next) => {
  const { id } = req.params
  try {
    const room = await Room.findById(id);
    if (!room) return next(createError(404, 'Room not found'));

    res.status(200).json(room);
  } catch (error) {
    next(error)
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error)
  }
};