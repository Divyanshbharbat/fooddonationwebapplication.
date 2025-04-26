

import express from 'express'
const app=express()
import User from '../User.js';
import FoodAvailable from '../../FoodAvailable.js';
import Count from '../count.js';
import Contact from '../Contact.js'
import Donation from '../Donation.js';
import Admin from '../../Admin.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();
router.post("/login", async (req, res) => {

  const { username, password } = req.body;
 
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid username or password" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid username or password" });
    const token = jwt.sign({ username }, "divyansh", { expiresIn: "1h" });
  
    
    res.json({ message: "success", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/admin/available', async (req, res) => {
  try {
   
    // Step 1: Save the food information
    const food = new FoodAvailable(req.body);
    let savedFood = await food.save();
  

  

    // Step 4: Return the success response
    res.status(201).json({ message: 'Food info added and count updated', food: savedFood, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add food info' });
  }
});

router.get("/counter", async (req, res) => {
  try {
    const count = await Count.findOne(); 
    console.log(count)// fetch the single count document
    res.status(200).json(count);
  } catch (err) {
    console.error("Error fetching counter:", err);
    res.status(500).json({ error: "Failed to fetch counter" });
  }
});
router.delete('/user/name/:name', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ username: req.params.name });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user by name' });
  }
});

// GET /api/leaderboard
router.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error loading leaderboard' });
  }
});




router.put('/admin/accept/:donationId/:username', async (req, res) => {
  try {
  
    const { donationId, username } = req.params;

    // 1. Update the donation status
    const updatedDonation = await Donation.findByIdAndUpdate(
      donationId,
      { status: 'accepted' },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // 2. Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 3. Find and update donation inside the user's donationInfo array
    const donationToUpdate = user.donationInfo.find(
      (donation) => donation._id.toString() === donationId
    );

    if (!donationToUpdate) {
      return res.status(404).json({ message: 'Donation not found in user record' });
    }

    donationToUpdate.status = 'accepted';

    // 4. Award points based on quantity
    const quantity = parseInt(donationToUpdate.quantity);
    if (quantity >= 1000) user.points += 100;
    else if (quantity >= 500) user.points += 50;
    else if (quantity >= 100) user.points += 10;
    else user.points += 1;

    let y=await user.save();
    

    res.json({
      message: 'Request accepted & points awarded',
      updatedDonation,
      userPoints: user.points,
      username: user.username
    });
  } catch (err) {
    console.error('Error accepting donation:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.put('/admin/reject/:donationId', async (req, res) => {
  try {
    const updated = await Donation.findByIdAndUpdate(
      req.params.donationId,
      { status: 'rejected' },
      { new: true }
    );
   
    res.json({ message: 'Request Rejected', updated });
  } catch (err) {
    console.error('Error updating donation:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find().populate('donationInfo');
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.send("success");
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// GET /available-donations


router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email, and Message are required' });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', adminId: admin._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all available food
router.get('/available', async (req, res) => {
  try {
    const foodList = await FoodAvailable.find().sort({ time: -1 });
    res.status(200).json({ foodList });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch available food' });
  }
});


router.post('/adminlogin', async (req, res) => {
    const { username, password } = req.body;
  
  
    try {
      const admin = await Admin.findOne({ admin: username });
  
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { adminId: admin._id, username: admin.username },
        "divyansh",
        { expiresIn: '1d' }
      );
      res.status(200).json({ message: 'success', adminId: admin._id,token:token });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/contact', async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  export default router;
