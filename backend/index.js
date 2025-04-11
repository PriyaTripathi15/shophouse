import express from 'express';
import cors from 'cors';
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import productRoutes from './routes/productRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from "./routes/checkout.js";
import Razorpay from "razorpay";
import { instance } from "./config/razorpay.js";
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // or wherever your frontend is running
  credentials: true, // ✅ allow sending cookies
}));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies 
app.use(cookieParser()); // Parse cookies 

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.get('/', (req, res) => {
  res.send('API is running...');
} );





app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);
app.use(notFound);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});