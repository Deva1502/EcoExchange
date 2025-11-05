const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an item name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
    default: 'https://via.placeholder.com/300'
  },
  condition: {
    type: String,
    required: [true, 'Please specify item condition'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'exchanged'],
    default: 'available'
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);