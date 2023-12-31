const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Product", ProductSchema);
