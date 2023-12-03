import express from 'express';
import { createHotel, deleteHotel, getAllHotels, getOneHotel, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/', verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)
router.get('/:id', getOneHotel)
router.get('/', getAllHotels)

export default router;