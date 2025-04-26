import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Add a virtual field to check if the donation has expired
donationSchema.virtual('isExpired').get(function() {
  const oneWeek = 1000 * 60 * 60 * 24 * 7; // milliseconds in one week
  return Date.now() - this.createdAt > oneWeek;
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
