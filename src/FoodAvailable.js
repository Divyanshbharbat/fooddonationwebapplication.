// models/FoodAvailable.js
import mongoose from 'mongoose'

const foodAvailableSchema = new mongoose.Schema({
  product: String,
  quantity: String,
  address: String,
  count: { type: Number, default: 1 },
  time: { type: Date, default: Date.now ,expires:21600}
});

let FoodAvailable = mongoose.model('FoodAvailable', foodAvailableSchema);
export default FoodAvailable
