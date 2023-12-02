import express from 'express';
import { createHotel } from '../controllers/hotel';
const router = express.Router();

router.post('/', createHotel)