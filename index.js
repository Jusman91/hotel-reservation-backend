import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDB from './src/config/db.js';

import hotelRoutes from './src/routes/hotel.js'

const v1 = '/api/v1/hotel-reservation'

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(`${v1}/hotels`, hotelRoutes)

// Server Listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`)
}
)