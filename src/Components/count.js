// models/Count.js
import mongoose from 'mongoose';

const countSchema = new mongoose.Schema({
  value: { type: Number, default: 1 },
});

const Count = mongoose.model('Count', countSchema);
export default Count;
