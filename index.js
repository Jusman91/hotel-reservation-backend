import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDB from './src/config/db.js';

import authRoutes from './src/routes/auth.js'
import hotelRoutes from './src/routes/hotel.js'
import userRoutes from './src/routes/users.js'

const v1 = '/api/v1/hotel-reservation'

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(`${v1}/auth`, authRoutes)
app.use(`${v1}/hotels`, hotelRoutes)
app.use(`${v1}/users`, userRoutes)

// Handle errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

// Server Listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`)
}
)