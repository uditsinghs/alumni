import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


connectDB()
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});

export default app;
