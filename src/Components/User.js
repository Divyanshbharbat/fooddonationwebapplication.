import mongoose, { Schema } from 'mongoose';

const userschema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
    points: { type: Number, default: 0 },
  password: {
    type: String,
    required: true
  },
  donationInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation'  // This should match the name of your Donation model
    }
  ]
});

export default mongoose.model('User', userschema);
