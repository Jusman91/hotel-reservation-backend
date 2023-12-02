import Hotel from "../models/Hotel.js"

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    next(error)
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error)
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Hotel has been deleted' });
  } catch (error) {
    next(error)
  }
};

export const getOneHotel = async (req, res, next) => {
  const { id } = req.params
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error)
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error)
  }
};