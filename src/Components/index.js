// server.js
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './User.js';
import Donation from './Donation.js'
import FoodAvailable from '../FoodAvailable.js';
dotenv.config();
import Admin from '../Admin.js';
import Count from './count.js';
const app = express();
app.use(express.json());
import router from './Router/router.js';
app.use(express.urlencoded({ extended: true }));
import nodemailer from 'nodemailer'
import { Router } from 'express';
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
const corsOptions = {
  origin: 'https://fooddonationwebapplication.vercel.app',
  credentials: true,
};
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/",router)
const jwtMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
 
  if (!token) 
    return res.status(401).send("fail");
  try {
    
    const decoded = jwt.verify(token, "divyansh");
   console.log(decoded)
    req.user = decoded;
   
    next();
  } catch (error) {
   
    res.send("fail");
  }
};

const jwtMiddleware2 = (req, res, next) => {
  const token = req.cookies?.token2 || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const decoded = jwt.verify(token, "divyansh");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("fail");
  }
};
// app.post("/ppp", jwtMiddleware, async (req, res) => {
//   try {
//     const { product, quantity, address, time } = req.body;

//     // ✅ Step 1: Create and save a new donation
//     const donation = new Donation({ product, quantity, address, time });
//     const savedDonation = await donation.save();

//     // ✅ Step 2: Find the user based on token data (req.user is from jwtMiddleware)
//     const updatedUser = await User.findOne({ username: req.user.username });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ Step 3: Link donation to user
//     updatedUser.donationInfo.push(savedDonation._id);
//     await updatedUser.save();

//     // ✅ Step 4: Handle the global counter
//     let counter = await Count.findOne();
//     if (!counter) {
//       counter = new Count({ value: 1 });
//     } else {
//       counter.value += 1;
//     }
//    await counter.save();

    

//     // ✅ Success Response
//     res.status(201).json({
//       message: 'Donation created and linked to user successfully',
//       donationId: savedDonation._id
//     });

//   } catch (err) {
//     console.error('❌ Error saving donation:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.post("/ppp", jwtMiddleware, async (req, res) => {
  try {
    
    const { product, quantity, address, time, to } = req.body;


    // ✅ Save donation
    const donation = new Donation({ product, quantity, address, time });
    const savedDonation = await donation.save();
  

    // ✅ Find user
    const updatedUser = await User.findOne({ username: req.user.username });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    

    // ✅ Link donation to user
    updatedUser.donationInfo.push(savedDonation._id);
    await updatedUser.save();

    // ✅ Update counter
    let counter = await Count.findOne();
    if (!counter) {
      counter = new Count({ value: 1 });
    } else {
      counter.value += 1;
    }
    const savedCounter = await counter.save();
 

    // ✅ Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASS,
      },
    });

    // ✅ Compose email
    const mailOptions = {
      from: `"Divyansh Food Donation Platform" <${process.env.VITE_EMAIL_USER}>`,
      to: to || 'bharbatdivyansh1@gmail.com',
      subject: "Heartfelt Thanks for Your Generous Donation!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Thank You, ${updatedUser.username}! 🌟</h2>
          <p>We are deeply grateful for your kind-hearted donation. Your support helps us bring hope and nourishment to many in need.</p>
          <h3 style="margin-top: 20px;">📝 Donation Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>🥘 Product:</strong> ${product}</li>
            <li><strong>📦 Quantity:</strong> ${quantity}</li>
            <li><strong>📍 Address:</strong> ${address}</li>
            <li><strong>⏰ Time of Donation:</strong> ${time}</li>
          </ul>
          <p style="margin-top: 20px;">Our team will contact you if any additional information is needed. Thank you for making a real difference! 💚</p>
          <p>With gratitude,<br><strong>Divyansh Food Donation Team</strong></p>
        </div>
      `
    };
    

    // ✅ Send email
    try {
      await transporter.sendMail(mailOptions);
     
    } catch (emailErr) {
      console.error("❌ Email error:", emailErr);
      return res.status(500).json({ message: "Donation saved, but email failed", error: emailErr.message });
    }

    // ✅ Final response
    res.status(201).json({
      message: "Donation successful, email sent",
      donationId: savedDonation._id,
    });

  } catch (err) {
    console.error("❌ Error in /ppp route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /available-donations



// Get all available food






app.get('/donation',jwtMiddleware, async (req, res) => {
  try {
   
    const user = await User.findOne({ username: req.user.username })
   
const p=await user.populate('donationInfo')

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    res.json({
      
      donations: user.donationInfo
    });
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// let y=async()=>{
//   const admin = new Admin({ username: "divyansh", password: "donater" });
//     const result = await admin.save();
//     console.log(result)

// }
// y()

mongoose.connect(process.env.VITE_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error", err));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
