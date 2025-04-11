// filepath: c:\Users\DELL\OneDrive\Desktop\payment_module_ecoomerce\backend\checkout.js
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use key_id from .env
  key_secret: process.env.RAZORPAY_SECRET, // Use key_secret from .env
});

router.post("/checkout", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Number(amount) * 100, // convert ₹ to paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).send("Order creation failed");
  }
});

export default router;